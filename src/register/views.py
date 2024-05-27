from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Profile
from django.urls import include, reverse_lazy, path
from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from rest_framework.response import Response
from .serializers import ProfileSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile
from .serializers import ProfileUpdateSerializer
from django.contrib.auth.models import User
from django.core.files.storage import default_storage
import os
import logging

class RegisterForm(UserCreationForm):
    fullname = forms.CharField(required=True)
    gender = forms.ChoiceField(choices=Profile.GENDER_CHOICES)
    birthdate = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))

    class Meta:
        model = User
        fields = ['username', 'fullname', 'email', 'password1', 'password2', 'gender', 'birthdate']
       

    def save(self, commit=True):
        user = super(RegisterForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
            user.profile.fullname = self.cleaned_data['fullname']
            user.profile.gender = self.cleaned_data['gender']
            user.profile.birthdate = self.cleaned_data['birthdate']
            user.profile.save()
        return user



class RegisterView(View):
    def get(self, request):
        form = RegisterForm()
        return render(request, 'register/register.html', {'form': form})

    def post(self, request):
      
        form = RegisterForm(request.POST)
        
        if form.is_valid():
            messages.success(request, "Đăng ký thành công! Vui lòng đăng nhập.")
            user = form.save()
            # Chuyển hướng người dùng đến trang đăng nhập sau khi đăng ký thành công
            return redirect('login')  # Đảm bảo rằng bạn có URL với tên 'login' được định nghĩa trong urls.py
        # Nếu form không hợp lệ, hiển thị lại form cùng với thông tin đã điền và lỗi
        
        return render(request, 'register/register.html', {'form': form})



logger = logging.getLogger(__name__)
@api_view(['POST'])
def update_profile(request, user_id):
    logger.debug(f"Received update request for user_id {user_id}")
    logger.debug(f"Request data: {request.data}")
    logger.debug(f"Request files: {request.FILES}")

    try:
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(user=user)
    except User.DoesNotExist:
        logger.error("User not found")
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Profile.DoesNotExist:
        logger.error("Profile not found")
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()

    if 'gender' in data and data['gender'] not in ['male', 'female']:
        data['gender'] = 'male'  # Set a default value if necessary

    serializer = ProfileUpdateSerializer(profile, data=data)
    if serializer.is_valid():
        print("helo1")
        serializer.save()
        if 'profile_picture' in request.FILES:
            profile_picture = request.FILES['profile_picture']
            if profile.profile_picture and profile.profile_picture.name:
                if os.path.isfile(profile.profile_picture.path):
                    os.remove(profile.profile_picture.path)
            profile_picture_path = default_storage.save(f'profiles/{user.id}/profile_picture.jpg', profile_picture)
            profile.profile_picture = profile_picture_path
            profile.save()
        updated_data = ProfileUpdateSerializer(profile).data
        logger.debug(f"Updated profile data: {updated_data}")
        return Response(updated_data, status=status.HTTP_200_OK)
    else:
        logger.error(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
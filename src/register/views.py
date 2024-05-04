from django.shortcuts import render

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Profile
from django.urls import include, reverse_lazy, path
from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
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




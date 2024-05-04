from django.shortcuts import render

from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.urls import include, reverse_lazy, path
from django.shortcuts import render, redirect
from django.views import View


class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]




class RegisterView(View):
    def get(self, request):
        form = RegisterForm()
        return render(request, 'register/register.html', {'form': form})

    def post(self, request):
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Có thể thêm logic để tự động đăng nhập người dùng tại đây
            return redirect('login')  # Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        return render(request, 'register/register.html', {'form': form})



"""
URL configuration for blog project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.contrib.auth import LoginView
from homepage import views as home 
from django.urls import reverse_lazy
from register import views as register 




class MyLoginView(LoginView):
    template_name = 'login/login.html'
    redirect_authenticated_user = True  # Tự động chuyển hướng người dùng đã đăng nhập
    next_page = reverse_lazy('index.html')  # Định nghĩa trang chuyển hướng sau đăng nhập

    def form_valid(self, form):
        # Đây là nơi bạn có thể thêm logic xử lý bổ sung trước khi phiên đăng nhập được thiết lập
        return super().form_valid(form)

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'), name='logout'),
    # path("register/", register.get_register, name="register"),
    
]

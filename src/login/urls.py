from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages

from django.urls import include, reverse_lazy, path

import register

class MyLoginView(LoginView):
    template_name = 'login/login.html'
    redirect_authenticated_user = True  # Tự động chuyển hướng người dùng đã đăng nhập
    next_page = reverse_lazy('home')  # Định nghĩa trang chuyển hướng sau đăng nhập  
    def form_valid(self, form):
        messages.success(self.request, "Bạn đã đăng nhập thành công!")
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.")
        return super().form_invalid(form)


urlpatterns = [
    path('login/', MyLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('',include("register.urls")),

    
]
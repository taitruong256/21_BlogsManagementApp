from django.urls import include, reverse_lazy, path
from .views import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    # Các URL khác của bạn ở đây
]

# profiles/urls.py

from django.urls import path
from .views import update_profile, RegisterView

urlpatterns = [
    path('<int:user_id>/update/', update_profile, name='update_profile'),
    path('register/', RegisterView.as_view(), name='register'),
]

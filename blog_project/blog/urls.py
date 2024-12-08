# blog/urls.py

from django.urls import path
from .views import create_post, blog_list

urlpatterns = [
    path('create/', create_post, name='create_post'),
    path('blog/', blog_list, name='blog_list'),
]
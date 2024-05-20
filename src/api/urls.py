from django.urls import path
from . import views

urlpatterns = [
    path('blogs/', views.BlogList.as_view(), name='api_blog_list'),
    path('add-blog/', views.AddBlogAPIView.as_view(), name='api_add_blog'),
    path('update-blog/<int:pk>/', views.UpdateBlogAPIView.as_view(), name='api_update_blog'),
    path('delete-blog/<int:pk>/', views.DeleteBlogAPIView.as_view(), name='api_delete_blog'),
]

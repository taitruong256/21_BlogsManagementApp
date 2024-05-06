from django.urls import path
from . import views

urlpatterns = [
    path('blogs/', views.BlogList.as_view(), name='blog_list'),
    path('add-blog/', views.AddBlogAPIView.as_view(), name='add_blog'),
    # path('update-blog/<int:id>/', views.update_blog),
    # path('delete-blog/<int:id>/', views.delete_blog),
]

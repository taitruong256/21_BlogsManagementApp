from django.urls import path
from . import views

urlpatterns = [
    path('get-all-blogs/', views.get_all_blogs),
    path('get-blog/<int:id>/', views.get_blog),
    path('add-blog/', views.add_blog),
    path('update-blog/<int:id>/', views.update_blog),
    path('delete-blog/<int:id>/', views.delete_blog),
]

from django.urls import path, include
from . import views
from django.conf.urls.static import static
from django.conf import settings 


urlpatterns = [
    path('', views.get_home, name='home'),
    path('add-blog/', views.get_add_blog, name='add_blog'),
    path('update-blog/<int:user_id>/<int:blog_id>/', views.get_update_blog, name='update_blog'),
    path('profile/<int:user_id>/', views.get_profile, name='profile'),
    path('blog-detail/<int:user_id>/<int:blog_id>/', views.get_blog_detail, name='blog-detail'),
    path('profile/', include('register.urls')),

] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings 

urlpatterns = [
    path('', views.get_home, name='home'),
    path('add-blog/', views.add_blog, name='add_blog'),
    path('data-json/', views.get_data ),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

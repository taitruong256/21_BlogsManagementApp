from django.contrib import admin
from .models import Category, Blog, Comment, Friend, Notification

admin.site.register(Category)
admin.site.register(Blog)
admin.site.register(Comment)
admin.site.register(Friend)
admin.site.register(Notification)

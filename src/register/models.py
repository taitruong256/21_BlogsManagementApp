# profiles/models.py

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=100, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    birthdate = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return str(self.user.id) + ' | ' + self.user.username

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()

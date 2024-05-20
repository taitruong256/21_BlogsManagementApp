from rest_framework import serializers
from .models import Profile 

class ProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id')
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    class Meta:
        model = Profile
        fields = ['user_id', 'username', 'email', 'fullname', 'gender', 'birthdate']
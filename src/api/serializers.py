from rest_framework import serializers
from .models import Category, Blog, Comment, Friend 
from register.serializers import ProfileSerializer




class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    img = serializers.ImageField(max_length=None, use_url=True, required=False)  # Cho phép trường img có thể trống
    comment_count = serializers.IntegerField(read_only=True)  

    class Meta:
        model = Blog
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(read_only=True)
    blog_id = serializers.PrimaryKeyRelatedField(source='blog', queryset=Blog.objects.all(), required=False)
    parent = serializers.PrimaryKeyRelatedField(queryset=Comment.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Comment
        fields = '__all__'
        
        
class FriendSerializer(serializers.ModelSerializer):
    user_from = ProfileSerializer(read_only=True)
    user_to = ProfileSerializer(read_only=True)

    class Meta:
        model = Friend
        fields = '__all__'
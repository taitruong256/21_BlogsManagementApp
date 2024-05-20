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
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True)
    img = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Blog
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(read_only=True)
    blog = serializers.PrimaryKeyRelatedField(queryset=Blog.objects.all())
    parent = serializers.PrimaryKeyRelatedField(queryset=Comment.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Comment
        fields = '__all__'
        
        
class FriendSerializer(serializers.ModelSerializer):
    user_from = ProfileSerializer(read_only=True)
    user_to = ProfileSerializer(read_only=True)

    class Meta:
        model = Friend
        fields = ['friend_id', 'user_from', 'user_to', 'date_created']
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Friend.objects.all(),
                fields=['user_from', 'user_to'],
                message="This user is already followed."
            )
        ]

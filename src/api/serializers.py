from rest_framework import serializers
from .models import Category
from .models import Blog




class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'


class BlogSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True)
    img = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Blog
        fields = '__all__'

    def create(self, validated_data):
        # Logic tạo Blog mới từ dữ liệu đã được validate
        return Blog.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Cập nhật và trả về một instance Blog đã được chỉnh sửa
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.markdown = validated_data.get('markdown', instance.markdown)
        instance.rank = validated_data.get('rank', instance.rank)
        instance.save()
        return instance


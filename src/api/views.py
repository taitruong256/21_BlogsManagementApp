from django.shortcuts import render, redirect
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer
from register.models import Profile
from register.serializers import ProfileSerializer
from django.http import JsonResponse

# Create your views here.


# class BlogByCatergory(generics.
class BlogList(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_queryset(self):
        """
        This view returns a list of all the blogs,
        or a list of blogs filtered by the search keyword.
        """
        search_query = self.request.query_params.get('search', None)
        if search_query:
            return Blog.objects.filter(title__icontains=search_query)
        else:
            return super().get_queryset()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # Create a dictionary containing information for each category
        categories_data = {}
        for blog in data:
            category_name = blog['category']['name_category']
            if category_name not in categories_data:
                categories_data[category_name] = {
                    'category': category_name,
                    'list_blog': []
                }
            blog_data = {
                'blog_id': blog['blog_id'], 
                'img': blog['img'],
                'title': blog['title'],
                'author': blog['user']['fullname'],
                'content': blog['description'],
                'rank': blog['votes']
            }
            categories_data[category_name]['list_blog'].append(blog_data)

        # Convert the categories_data dictionary to a list
        result = list(categories_data.values())

        return Response(result)
    
    
class AddBlogAPIView(generics.CreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return redirect('home')  # Chuyển hướng đến trang chính sau khi thêm blog thành công
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateBlogAPIView(generics.UpdateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()  # Lấy đối tượng blog cần cập nhật
        serializer = self.get_serializer(instance, data=request.data)  # Tạo serializer với dữ liệu mới và đối tượng cần cập nhật
        if serializer.is_valid():
            serializer.save()  # Lưu cập nhật
            return redirect('home')  # Chuyển hướng về trang chính sau khi cập nhật thành công
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Trả về lỗi nếu dữ liệu không hợp lệ


class DeleteBlogAPIView(generics.DestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()  # Lấy đối tượng blog cần xóa
        self.perform_destroy(instance)  # Xóa đối tượng blog
        return redirect('home')  # Chuyển hướng về trang chính sau khi xóa thành công
    
    
class ProfileDetailView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        user_id = self.kwargs.get("user_id")
        return Profile.objects.get(user__id=user_id)
    
    
class BlogDetailView(generics.RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'blog_id'
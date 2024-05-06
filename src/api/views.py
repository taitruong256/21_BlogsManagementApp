from django.shortcuts import render, redirect
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer

# Create your views here.


class BlogList(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_queryset(self):
        """
        Chế độ xem này sẽ trả về danh sách tất cả các blog
        hoặc danh sách blog đã lọc theo từ khóa tìm kiếm.
        """
        search_query = self.request.query_params.get('search', None)
        
        if search_query:
            queryset = Blog.objects.filter(title__icontains=search_query)
            # Lọc blog theo tiêu đề chứa từ khóa tìm kiếm (không phân biệt hoa thường)
        else:
            queryset = super().get_queryset()  # Lấy tất cả các blog nếu không có từ khóa tìm kiếm
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # Tạo danh sách các category duy nhất từ các blog trong queryset
        categories = set([blog['category'] for blog in data])

        # Tạo dictionary chứa thông tin của từng category
        categories_data = []
        for category in categories:
            category_data = {
                'category': category,
                'list_blog': [blog for blog in data if blog['category'] == category]
            }
            categories_data.append(category_data)

        return Response(categories_data)

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
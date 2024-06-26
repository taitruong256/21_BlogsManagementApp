from django.shortcuts import render, redirect
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Blog, Comment, Category, Friend, Notification
from .serializers import BlogSerializer, CommentSerializer, CategorySerializer, FriendSerializer, NotificationSerializer
from register.models import Profile
from register.serializers import ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from django.utils import timezone
from django.utils.dateparse import parse_datetime

# Create your views here.


class BlogList(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_queryset(self):
        """
        This view returns a list of all the blogs,
        or a list of blogs filtered by the search keyword.
        Only blogs with date_published before the current time are returned.
        """
        search_query = self.request.query_params.get('search', None)
        user_id = self.kwargs.get('user_id', None)
        
        if user_id:
            profile = Profile.objects.get(user_id=user_id)
            return Blog.objects.filter(user=profile).order_by('-date_published')
        
        current_time = timezone.now()
        
        if search_query:
            return Blog.objects.filter(title__icontains=search_query, date_published__lt=current_time)
        else:
            return Blog.objects.filter(date_published__lt=current_time)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # Create a dictionary containing information for each category
        categories_data = {}
        for blog in data:
            published_time = parse_datetime(blog['date_published'])
            if published_time < timezone.now():
                category_name = blog['category']['name_category']
                if category_name not in categories_data:
                    categories_data[category_name] = {
                        'category': category_name,
                        'list_blog': []
                    }
                blog_data = {
                    'blog_id': blog['blog_id'], 
                    'user_id': blog['user']['user_id'], 
                    'img': blog['img'],
                    'title': blog['title'],
                    'author': blog['user']['fullname'],
                    'content': blog['description'],
                    'rank': blog['views']
                }
                categories_data[category_name]['list_blog'].append(blog_data)

        # Convert the categories_data dictionary to a list
        result = list(categories_data.values())

        return Response(result)
    
class UserBlogList(generics.ListAPIView):
    serializer_class = BlogSerializer

    def get_queryset(self):
        """
        This view returns a list of blogs filtered by user_id.
        Only blogs with date_published before the current time are returned.
        """
        user_id = self.kwargs['user_id']
        profile = Profile.objects.get(user_id=user_id)
        current_time = timezone.now()
        return Blog.objects.filter(user=profile, date_published__lt=current_time)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        # Create a dictionary containing information for each category
        categories_data = {}
        for blog in data:
            published_time = parse_datetime(blog['date_published'])
            if published_time < timezone.now():
                category_name = blog['category']['name_category']
                if category_name not in categories_data:
                    categories_data[category_name] = {
                        'category': category_name,
                        'list_blog': []
                    }
                blog_data = {
                    'blog_id': blog['blog_id'], 
                    'user_id': blog['user']['user_id'], 
                    'img': blog['img'],
                    'title': blog['title'],
                    'author': blog['user']['fullname'],
                    'content': blog['description'],
                    'rank': blog['views']
                }
                categories_data[category_name]['list_blog'].append(blog_data)

        # Convert the categories_data dictionary to a list
        result = list(categories_data.values())

        return Response(result)
    
    
class AddBlogAPIView(generics.CreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Tìm đối tượng Profile tương ứng với user đăng nhập
        profile = Profile.objects.get(user=self.request.user)
        category = Category.objects.get(category_id=self.request.data.get('category_id'))
        serializer.save(user=profile, category=category)  # Gán profile cho blog mới

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)  # Gọi perform_create để lưu blog
            return redirect('home')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateBlogAPIView(generics.UpdateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'blog_id'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()  # Lấy đối tượng blog cần cập nhật
        serializer = self.get_serializer(instance, data=request.data)  # Tạo serializer với dữ liệu mới và đối tượng cần cập nhật
        if serializer.is_valid():
            serializer.save()  # Lưu cập nhật
            return Response(serializer.data, status=status.HTTP_200_OK)  # Trả về dữ liệu blog sau khi cập nhật thành công
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Trả về lỗi nếu dữ liệu không hợp lệ


class DeleteBlogAPIView(generics.DestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'blog_id'

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
    
    def get_queryset(self):
        return super().get_queryset().annotate(comment_count=Count('comments'))
    
    
class CommentTreeView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        blog_id = self.kwargs.get('blog_id')
        return Comment.objects.filter(blog_id=blog_id, parent=None)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        serialized_data = self.build_comment_tree(serializer.data)
        return Response(serialized_data)

    def build_comment_tree(self, comments):
        def _get_replies(comment_id):
            replies = Comment.objects.filter(parent_id=comment_id)
            return self.build_comment_tree(self.get_serializer(replies, many=True).data)

        tree = []
        for comment in comments:
            comment_data = {
                'comment_id': comment['comment_id'],
                'blog': comment['blog'],
                'user': comment['user'],
                'parent': comment['parent'],
                'content': comment['content'],
                'date_created': comment['date_created'],
            }
            replies = _get_replies(comment['comment_id'])
            if replies:
                comment_data['replies'] = replies
            tree.append(comment_data)
        return tree


class AddCommentAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        # Lấy blog_id từ kwargs
        blog_id = self.kwargs['blog_id']
        
        # Tìm Profile và Blog tương ứng
        profile = Profile.objects.get(user=self.request.user)
        blog = Blog.objects.get(blog_id=blog_id)
        
        # Lưu comment với thông tin user và blog tương ứng
        serializer.save(user=profile, blog=blog)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddReplyAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        # Tìm đối tượng Profile và Blog tương ứng với user đăng nhập
        blog_id = self.kwargs['blog_id']
        parent_id = self.kwargs.get('parent_id')

        profile = Profile.objects.get(user=self.request.user)
        blog = Blog.objects.get(blog_id=blog_id)
        parent = Comment.objects.get(comment_id=parent_id)
        serializer.save(user=profile, blog=blog, parent=parent)  # Gán profile cho blog mới

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)  # Gọi perform_create để lưu blog
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteCommentAPIView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'comment_id'  # Đặt lookup_field thành "comment_id"

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class CategoryListAPIView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    
class AddCategoryAPIView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can create categories

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Created successfully
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    
class AddFriendAPIView(generics.CreateAPIView):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        profile_from = Profile.objects.get(user=self.request.user)  # Lấy đối tượng Profile tương ứng với user đăng nhập
        user_to_id = self.kwargs.get('id_user_to')  # Lấy id của user bạn bè từ URL parameters
        profile_to = Profile.objects.get(id=user_to_id)  # Lấy đối tượng Profile của user bạn bè
        serializer.save(user_from=profile_from, user_to=profile_to)  # Lưu mối quan hệ bạn bè mới

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data={})  # Khởi tạo serializer với dữ liệu trống
        if serializer.is_valid():
            self.perform_create(serializer)  # Gọi perform_create để lưu mối quan hệ bạn bè
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RemoveFriendAPIView(generics.DestroyAPIView):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'user_to'

    def destroy(self, request, *args, **kwargs):
        try:
            profile_from = Profile.objects.get(user=self.request.user)  # Lấy đối tượng Profile tương ứng với user đăng nhập
            user_to_id = kwargs.get('id_user_to') # Lấy id của user bạn bè từ URL parameters
            profile_to = Profile.objects.get(id=user_to_id) # Lấy đối tượng Profile của user bạn bè
            instance = Friend.objects.get(user_from=profile_from, user_to=profile_to)  # Truy xuất mối quan hệ bạn bè
            self.perform_destroy(instance)
            
            return Response({
                'message': 'Bạn bè đã được xóa thành công',
                'status': 'success'
            }, status=status.HTTP_200_OK)

        except Profile.DoesNotExist:
            return Response({'error': 'Không tìm thấy hồ sơ'}, status=status.HTTP_404_NOT_FOUND)
        except Friend.DoesNotExist:
            return Response({'error': 'Không tìm thấy mối quan hệ bạn bè'}, status=status.HTTP_404_NOT_FOUND)

    def perform_destroy(self, instance):
        instance.delete()
        
class GetFollowingAPIView(generics.ListAPIView):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_from_id = self.kwargs.get('id_user_from')
        profile_from = Profile.objects.get(id=user_from_id)
        return Friend.objects.filter(user_from=profile_from)
    
class GetFollowerAPIView(generics.ListAPIView):
    serializer_class = FriendSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_to_id = self.kwargs.get('id_user_to')
        profile_to = Profile.objects.get(id=user_to_id)
        return Friend.objects.filter(user_to=profile_to)
    
    
class NotificationListAPIView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        profile = Profile.objects.get(user=user)
        return Notification.objects.filter(user=profile)

class AddNotificationAPIView(generics.CreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user_id = self.kwargs.get('user_id')  # Lấy user_id từ URL parameters
        user = Profile.objects.get(user_id=user_id)  # Tìm đối tượng Profile tương ứng
        serializer.save(user=user)
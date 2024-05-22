from django.urls import path
from . import views

urlpatterns = [
    path('blogs/', views.BlogList.as_view(), name='api_blog_list'),
    path('add-blog/', views.AddBlogAPIView.as_view(), name='api_add_blog'),
    path('update-blog/<int:blog_id>/', views.UpdateBlogAPIView.as_view(), name='api_update_blog'),
    path('delete-blog/<int:blog_id>/', views.DeleteBlogAPIView.as_view(), name='api_delete_blog'),
    path('blog/<int:user_id>/<int:blog_id>/', views.BlogDetailView.as_view(), name='api-blog-detail'),
    
    path('user/<int:user_id>/', views.ProfileDetailView.as_view(), name='profile-detail'),
    
    path('comments-tree/<int:user_id>/<int:blog_id>/', views.CommentTreeView.as_view(), name='api-comment-tree'),
    path('comment/add/<int:user_id>/<int:blog_id>/', views.AddCommentAPIView.as_view(), name='api-add-comment'),
    path('comment/add-reply/<int:user_id>/<int:blog_id>/<int:parent_id>/', views.AddReplyAPIView.as_view(), name='api-add-reply'),
    path('comment/delete/<int:comment_id>/', views.DeleteCommentAPIView.as_view(), name='api-delete-comment'),
    
    path('categories/', views.CategoryListAPIView.as_view(), name='category-list'),
    
    path('friend/add/', views.AddFriendAPIView.as_view(), name='add_friend'),
    path('friend/remove/<int:friend_id>/', views.RemoveFriendAPIView.as_view(), name='remove_friend'),
]

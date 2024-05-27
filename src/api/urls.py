from django.urls import path
from . import views

urlpatterns = [
    path('blog/list/', views.BlogList.as_view(), name='api_blog_list'),
    path('blog/list/<int:user_id>/', views.BlogList.as_view(), name='api_blog_list'),
    path('blog/add/', views.AddBlogAPIView.as_view(), name='api_add_blog'),
    path('blog/update/<int:user_id>/<int:blog_id>/', views.UpdateBlogAPIView.as_view(), name='api_update_blog'),
    path('blog/delete/<int:blog_id>/', views.DeleteBlogAPIView.as_view(), name='api_delete_blog'),
    path('blog/detail/<int:user_id>/<int:blog_id>/', views.BlogDetailView.as_view(), name='api-blog-detail'),
    
    path('user/<int:user_id>/', views.ProfileDetailView.as_view(), name='api_profile_detail'),
    
    path('comment/tree/<int:user_id>/<int:blog_id>/', views.CommentTreeView.as_view(), name='api_comment_tree'),
    path('comment/add/<int:user_id>/<int:blog_id>/', views.AddCommentAPIView.as_view(), name='api_add_comment'),
    path('comment/add-reply/<int:user_id>/<int:blog_id>/<int:parent_id>/', views.AddReplyAPIView.as_view(), name='api_add_reply'),
    path('comment/delete/<int:comment_id>/', views.DeleteCommentAPIView.as_view(), name='api_delete_comment'),
    
    path('category/list/', views.CategoryListAPIView.as_view(), name='api_category_list'),
    path('category/add/', views.AddCategoryAPIView.as_view(), name='api_add_category'),
    
    path('friend/add/<int:id_user_to>/', views.AddFriendAPIView.as_view(), name='api_add_friend'),
    path('friend/delete/<int:id_user_to>/', views.RemoveFriendAPIView.as_view(), name='api_delete_friend'),
    path('friend/following/<int:id_user_from>/', views.GetFollowingAPIView.as_view(), name='api_following_friend'),
    path('friend/follower/<int:id_user_to>/', views.GetFollowerAPIView.as_view(), name='api_follower_friend'),
    
    path('notification/list/', views.NotificationListAPIView.as_view(), name='api_notification_list'),
    path('notification/add/<int:user_id>/', views.AddNotificationAPIView.as_view(), name='api_add_notification'),
]

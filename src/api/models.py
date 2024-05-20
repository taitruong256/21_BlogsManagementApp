from django.db import models
from register.models import Profile
from django.core.files.storage import FileSystemStorage


# Thiết lập đường dẫn lưu trữ cho hình ảnh
fs = FileSystemStorage(location='/media/images')


# Bảng thể loại
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name_category = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name_category

# Bảng blog
class Blog(models.Model):
    blog_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='blogs')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='blogs')
    img = models.ImageField(upload_to='images')  
    title = models.CharField(max_length=200, unique= True)
    description = models.TextField()
    markdown = models.TextField()
    views = models.PositiveIntegerField(default=0)
    votes = models.PositiveIntegerField(default=0)


    def __str__(self):
        return self.title


# Bảng Comment
class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies', default=None)
    content = models.TextField()

    def __str__(self):
        return f'Comment by {self.user} on {self.blog}: {self.content}'
    

# Bảng Friend dùng để theo dõi bạn bè 
class Friend(models.Model):
    friend_id = models.AutoField(primary_key=True)
    user_from = models.ForeignKey(Profile, related_name='following', on_delete=models.CASCADE)
    user_to = models.ForeignKey(Profile, related_name='followers', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user_from', 'user_to')    # Đảm bảo rằng mỗi cặp (user_from, user_to) là duy nhất, nghĩa là một người không thể theo dõi cùng một người nhiều lần.

    def __str__(self):
        return f'{self.user_from} follows {self.user_to}'
    
    
    
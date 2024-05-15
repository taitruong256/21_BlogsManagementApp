from django.db import models

from django.core.files.storage import FileSystemStorage


# Thiết lập đường dẫn lưu trữ cho hình ảnh
fs = FileSystemStorage(location='/media/images')


# Bảng thể loại
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

# Bảng blog với khóa ngoại tới bảng Category
class Blog(models.Model):
    blog_id = models.AutoField(primary_key=True)
    img = models.ImageField(storage=fs)  # Lưu hình ảnh trên file system
    title = models.CharField(max_length=200, unique= True)
    author = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="blogs")
    markdown = models.TextField()
    rank = models.IntegerField()



    def __str__(self):
        return self.title

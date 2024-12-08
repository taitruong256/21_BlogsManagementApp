# blog/views.py

from django.shortcuts import render, redirect
from .forms import BlogPostForm

def create_post(request):
    if request.method == 'POST':
        form = BlogPostForm(request.POST)
        if form.is_valid():
            form.save()  # Lưu dữ liệu vào cơ sở dữ liệu
            return redirect('create_post')  # Chuyển hướng sau khi lưu thành công
    else:
        form = BlogPostForm()
    return render(request, 'blog/create_post.html', {'form': form})

from django.shortcuts import render
from .models import BlogPost

def blog_list(request):
    posts = BlogPost.objects.all()  # Truy vấn tất cả các bài blog từ cơ sở dữ liệu
    return render(request, 'blog/blog_list.html', {'posts': posts})
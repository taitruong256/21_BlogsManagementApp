from django.shortcuts import render
from django.shortcuts import redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
# Create your views here.
def get_home(request):
    user = request.user
    return render(request, 'index.html', {'user': user})


def index(request):
    if request.user.is_authenticated:
        return redirect('home')
    return redirect('login')

def get_add_blog(request):
    user = request.user
    return render(request, "add_blog.html", {'user': user})

def get_blog_detail(request, user_id, blog_id):
    user = request.user
    return render(request, 'blog_detail.html', {'user': user})

def get_profile(request, user_id):
    user = request.user
    return render(request, 'profile.html', {'user': user})

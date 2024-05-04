from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
# Create your views here.
def get_home(request):
    return render(request, "index.html")


def index(request):
    if request.user.is_authenticated:
        return redirect('home')
    return redirect('login')
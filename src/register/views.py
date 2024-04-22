from django.shortcuts import render

# Create your views here.
def get_register(request):
    return render(request, 'register.html')
from django.shortcuts import render,redirect
from django.contrib import messages
from django.contrib.auth import login,authenticate,logout
from django.contrib.auth.decorators import login_required
from .models import *

# Create your views here.

@login_required(login_url="/login/")   # #login is where we want to send the user when it tries to access that page that requires authentication
def home(request):
    pizzas = Pizza.objects.all()
    context={'pizzas' :pizzas}
    
    return render(request,"index.html",context)

def login_page(request):
    if request.method == 'POST':
        try:
            username=request.POST.get('user_name')
            password=request.POST.get('password')

            user_obj=User.objects.filter(username=username)
            if not user_obj.exists():
                messages.error(request,'Invalid Username')
                return redirect('/login/')
            else:
                user_obj=authenticate(username=username,password=password)
                if user_obj:
                    login(request,user_obj)  #to maintain session
                    return redirect('/')
                
                messages.error(request,'Wrong Password')
                return redirect('/login/')
        except Exception as e:
            messages.error(request,'Something went wrong.')

            return redirect('/register/')

    
    return render(request,'login.html')

def register_page(request):
    if request.method == 'POST':
        try:
            username=request.POST.get('user_name')
            password=request.POST.get('password')

            user_obj=User.objects.filter(username=username)
            if user_obj.exists():
                messages.error(request,'Username is taken.')
                return redirect('/register/')
            else:
                user_obj=User.objects.create(username=username)
                user_obj.set_password(password)
                user_obj.save()
                messages.success(request,'Account created.')
                return redirect('/login/')
        except Exception as e:
            print(e)
            messages.error(request,'Something went wrong.')

            return redirect('/register/')

           
    return render(request,'register.html')

def logout_page(request):
    logout(request)
    return redirect('/login')





def add_cart(request,pizza_uid):
    return redirect("/")
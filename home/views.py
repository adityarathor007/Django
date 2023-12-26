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
            if user_obj.exists():
                messages.error(request,'Username is taken.')
                return redirect('/register/')
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

def add_cart(request,pizza_uid):
    user = request.user
    pizza_obj=Pizza.objects.get(uid=pizza_uid)
    cart,_=Cart.objects.get_or_create(user=user,is_paid=False)
    cart_items=CartItems.objects.create(
        cart=cart,
        pizza=pizza_obj
    )
    return redirect("/")



def cart(request):
    cart=Cart.objects.get(is_paid=False,user=request.user)
    context={'carts': cart}
    return render(request,'cart.html',context)

def remove_cart_items(request,cart_item_uid):
    try:
        CartItems.objects.get(uid=cart_item_uid).delete()

        return redirect('/cart/')
    except Exception as e:
        print(e)


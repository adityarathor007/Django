from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

User=get_user_model()


# for allowing user to view recipe page only when it is logged in 

from .models import *

# Create your views here.


@login_required(login_url="/login/")  #login is where we want to send the user when it tries to access that page that requires authentication  
def recipes(request):
    if request.method == "POST":
        data=request.POST
        recipe_image=request.FILES.get('recipe_image')
        recipe_name= data.get("recipe_name")
        recipe_description=data.get("recipe_description")


        # print(recipe_name)

        Recipe.objects.create(
            recipe_name=recipe_name,
            recipe_desc=recipe_description,
            recipe_image=recipe_image,
        )

        # print(recipe_description)
        # print(recipe_name)
        return redirect("/recipes")
    
    queryset= Recipe.objects.all()

    if request.GET.get('search_re'):
        # print(request.GET.get('search_re'))
        queryset=queryset.filter(recipe_name__icontains=request.GET.get('search_re'))


    
    context={'recipes':queryset}
    return render(request, 'recipes.html',context)

def delete_recipes(request,id):
    querySet=Recipe.objects.get(id=id)
    querySet.delete()

    return redirect('/recipes/')

def update_recipes(request,id):
    querySet=Recipe.objects.get(id=id)

    if request.method=="POST":
        data=request.POST
        recipe_image=request.FILES.get('recipe_image')
        recipe_name= data.get("recipe_name")
        recipe_description=data.get("recipe_description")

        querySet.recipe_name=recipe_name
        querySet.recipe_desc=recipe_description
        if recipe_image:
            querySet.recipe_image=recipe_image
        
        querySet.save()
        return redirect('/recipes/')

    context={'recipe':querySet}  #for showing the old data on the recipe page

    return render(request,'update_recipes.html',context)


def login_page(request):
    if request.method == 'POST':
        UserName=request.POST.get('user_name')
        Password=request.POST.get('password')

        if not User.objects.filter(username=UserName).exists():
            messages.error(request,'Invalid Username')
            return redirect('/login/')  

        user1=authenticate(username=UserName,password=Password)  #for handling authentication of password

        if user1 is None:
            messages.error(request,'Invalid Password')
            return redirect('/login/')
        
        else:
            login(request,user1)  #to maintain session
            return redirect('/recipes/')


    return render(request,'login.html')

def logout_page(request):
    logout(request)
    return redirect('/login/')



def register_page(request):
    if request.method == 'POST':
        firstName=request.POST.get('first_name')
        lastName=request.POST.get('last_name')
        UserName=request.POST.get('user_name')
        Password=request.POST.get('password')

        user=User.objects.filter(username=UserName)

        if user.exists():  #for handling when the username already exists
            messages.info(request,'UserName already taken')
            return redirect('/register/')


        user=User.objects.create(
            first_name=firstName ,
            last_name=lastName ,
            username=UserName 
        )
        user.set_password(Password)
        user.save()

        messages.info(request,'Account created Succesfully')
        return redirect('/register/')

    return render(request,'register.html')
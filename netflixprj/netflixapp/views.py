from django.shortcuts import render,redirect
from django.views.generic import View
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .forms import *

# Create your views here.

# this are function based views
# def Home(request):
    # return render(request,'netflixapp/index.html')



# Now using class based views

class Home(View):
    def get(self,request,*args,**kwargs): 
        if request.user.is_authenticated:
            return redirect('netflixapp:Profiles')
        return render(request,'index.html')
    


method_decorator(login_required,name='dispatch')
class ProfileViews(View):
    def get(self,request,*args,**kwargs):
        profiles=request.user.profile.all()  #to get all profiles asssociated with a particular user

        context={
            'profiles':profiles
        }
        return render(request,'profilelist.html',context)
    

    


method_decorator(login_required,name='dispatch')
class ProfileCreate(View):
    def get(self,request,*args,**kwargs):
        form = ProfileForm()
        context={
            'form':form
        }

        return render(request,'profile_create.html',context)

       
    def post(self,request,*args,**kwargs):
        form = ProfileForm(request.POST or None)
        if form.is_valid():
            # print(form.cleaned_data)
            profile=Profile.objects.create(**form.cleaned_data)
            if profile:
                request.user.profile.add(profile)  #to add the profile to the logged in user 
                return redirect('netflixapp:Profiles')
        context={ 
            'form':form
        }

        return render(request,'profile_create.html',context)

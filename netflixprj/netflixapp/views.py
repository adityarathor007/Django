from django.shortcuts import render,redirect
from django.views.generic import View
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

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
from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse

# Create your views here.

# this are function based views
# def Home(request):
    # return render(request,'netflixapp/index.html')



# Now using class based views

class Home(View):
    def get(self,request,*args,**kwargs): 
        return render(request,'index.html')
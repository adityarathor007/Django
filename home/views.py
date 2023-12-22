from django.shortcuts import render,redirect
from django.conf import settings
import random

from django.http import HttpResponse
from campusHub.seed import seed_db
from .utils import send_email_to_client,send_email_with_attachment
# Create your views here.

def send_email(request):
    # send_email_to_client()
    subject="this email is from django server with attachment"
    message='hey pfa'
    recipient_list=["adityarathor120@gmail.com"]
    file_path=f"{settings.BASE_DIR}/main.xlsx"
    send_email_with_attachment(subject,message,recipient_list,file_path)
    return redirect('/')


from home.models import Car
def home(request):
    # seed_db(100)
    # return HttpResponse("<h1>Hey I am a Django Server</h1>")
    Car.objects.create(car_name=f"Ferrari-{random.randint(0,100)}")

    # for dynamic data ie passing the data from here to index.html then we make use of context

    peoples=[
        {'name':"Aditya Rathor",'age':18},
        {'name':"Ronaldo","age":34},
        {'name':"Rohan","age":23},
        {'name':"Shreya","age":2},

    ]
    
    text = '''Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Tristique senectus et netus et malesuada fames. Egestas egestas fringilla phasellus faucibus. Viverra aliquet eget sit amet tellus cras adipiscing enim. Lectus mauris ultrices eros in cursus turpis massa. Sem nulla pharetra diam sit amet nisl suscipit adipiscing. Ornare quam viverra orci sagittis eu volutpat. Consequat ac felis donec et odio pellentesque. Luctus accumsan tortor posuere ac ut consequat semper viverra.
            Maecenas sed enim ut sem vivisus rci nulla pellentesque dignissim enim Vitae semper quis lectus nulla at. Nibh ipsum consequat nisl vel pretium. Viverra maecenas accumsan lacus vel facilisis volutpat. Dolor morbi non arcu risus quis varius quam. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Quam id leo in vitae turpis. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Varius vel pharetra vel turpis nunc eget lorem. Faucibus turpis in eu mi bibendum. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Proin sed libero enim sed faucibus turpis. Senectus et netus et malesuada fames ac turpis. Fermentum iaculis eu non diam phasellus vestibulum. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Enim lobortis scelerisque fermentum dui faucibus. Aliquet sagittis id consectetur purus ut. A pellentesque sit amet porttitor eget. Tempus quam pellentesque nec nam aliquam sem.'''

    vegetables=["pumpkin","cucumber",'tomato']
    # returning the html page
    return render(request,"home/index.html",context={"peoples":peoples,"text":text,"vegetables":vegetables})#this is for static data


def contact(request):
    context={'page':'Contact'}
    return render(request,"home/contact.html",context)

def about(request):
    context={'page':'About'}
    return render(request,"home/about.html",context)

def success_page(request):
    print("*"*10)
    return HttpResponse("<h1>this is the success page</h1>")

    
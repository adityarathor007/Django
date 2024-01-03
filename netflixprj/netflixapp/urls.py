from django.urls import path
from .views import *


app_name='netflixapp'

urlpatterns=[
    path('',Home.as_view(),name='Home'),
    path('profiles',ProfileViews.as_view(),name='Profiles'),
    
]
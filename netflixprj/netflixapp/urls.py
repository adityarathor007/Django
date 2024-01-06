from django.urls import path
from .views import *


app_name='netflixapp'

urlpatterns=[
    path('',Home.as_view(),name='Home'),
    path('profiles',ProfileViews.as_view(),name='Profiles'),
    path('profiles/create/',ProfileCreate.as_view(),name='Create_profile'),
    path('watch/<str:profile_id>',MovieList.as_view(),name='Movie-list'), 
    path('watch/detail/<str:movie_id>',MovieDetail.as_view(),name='Movie-detail')
    
]



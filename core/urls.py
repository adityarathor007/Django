"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from home.views import *
from vege.views import *
from campusHub.views import *


from django.conf.urls.static import static
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    path('',home,name="home"),
    path('recipes/',recipes),
    path('about/',about),
    path('contact/',contact),
    path('delete-recipe/<id>/',delete_recipes,name='delete_recipe'),
    path('update-recipe/<slug>/',update_recipes,name='update_recipe'),
    path('login/',login_page,name='login_page'),
    path('send_email/',send_email,name='send_email'),
    path('logout/',logout_page,name='logout_page'),
    path('register/',register_page,name='register_page'),
    path('s',success_page,name="s-page"),
    path("admin/", admin.site.urls),
    path('students/',get_students,name="get_students"),
    path('see-marks/<student_id>/',see_marks,name='see_marks')  #name is used to remove the dependicy of the path  as this name can be directly used in links even though the path changes it will still redirect
]


if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)


urlpatterns+=staticfiles_urlpatterns()

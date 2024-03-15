from django.urls import path
from .views import getRoutes,getProducts,getProduct,MyTokenObtainPairView,getUserProfile,getUsers,registerUser


urlpatterns=[
    path('users/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('',getRoutes,name='routes'),
    path('users/profile',getProducts,name='user-profile'),
    path('products/',getProducts,name='products'),
    path('products/<str:pk>',getProduct,name='products'),
    path('users/',getUsers,name='users'),
    path('users/register/',registerUser,name='register'),
]
from django.urls import path
from .views import getRoutes,getProducts,getProduct
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


urlpatterns=[
    path('users/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('',getRoutes,name='routes'),
    path('products/',getProducts,name='products'),
    path('products/<str:pk>',getProduct,name='products'),
]
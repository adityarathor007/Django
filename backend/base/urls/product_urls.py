from django.urls import path
from base.views import product_views as views



urlpatterns=[
    path('',views.getProducts,name='products'),
    path('create/',views.createProduct,name="product-create"),
    path('<str:pk>/',views.getProduct,name='products'),
    path('update/<str:pk>/',views.updateProduct,name='product_update'),
    path('delete/<str:pk>/',views.deleteProduct,name='product_delete'),
   
]
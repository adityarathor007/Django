# from django.shortcuts import render
# from django.http import JsonResponse
# from .products import products as now we are fetching data from the backend
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from base.models import Product
from django.contrib.auth.models import User
from base.serializer import ProductSerializer,UserSerializer
from rest_framework import status




@api_view(['GET'])
def getProducts(request):
    user=request.user
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False) #as we are asking for one item
    
    return Response(serializer.data)


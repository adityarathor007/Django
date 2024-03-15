from django.shortcuts import render
from django.http import JsonResponse
# from .products import products as now we are fetching data from the backend
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from .models import Product
from django.contrib.auth.models import User
from .serializer import ProductSerializer,UserSerializer,UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username']=self.user.username
        # data['email']=self.user.email

        # better method to show more info

        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v


        return data

    
    
class MyTokenObtainPairView(TokenObtainPairView):
    serialize_class=MyTokenObtainPairSerializer


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes=[
        'api/products/',
        'api/products/create/',
        
        'api/products/upload/',

        'api/products/<id>/reviews/',

        'api/products/top/',
        'api/products/<id>'

        'api/products/delete/<id>',
        'api/products/<update>/<id>'

    ]

    return Response(routes)


@api_view(['POST'])
def registerUser(request):
    try:
        data=request.data
        print('DATA: ',data)
        user=User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']),  #to hash password


        )
        serailizer=UserSerializerWithToken(user,many=False)


        return Response(serailizer.data)
    except:
        message={'detail':'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)






@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])  #making this accesible to the Admin and Staff
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProducts(request):
    user=request.user
    serializer=UserSerializer(user,many=False) #as one user request
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False) #as we are asking for one item
    
    return Response(serializer.data)
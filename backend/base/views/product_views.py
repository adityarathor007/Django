# from django.shortcuts import render
# from django.http import JsonResponse
# from .products import products as now we are fetching data from the backend
from rest_framework.decorators import api_view,permission_classes,renderer_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from base.models import Product
from django.contrib.auth.models import User
from base.serializer import ProductSerializer,UserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import AccessToken
from django.shortcuts import get_object_or_404
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer


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


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product=Product.objects.get(_id=pk)
    product.delete()    
    return Response('Product Deleted')


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):

    product = Product.objects.create(
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description='',
    )

    serializer = ProductSerializer(product, many=False)
    print(serializer.data)
    return Response(serializer.data)

        



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data=request.data
    product_data = data['product']
    product=Product.objects.get(_id=pk)
    if 'user' in data:
        user_data = data['user']
        user=User.objects.get(id=user_data['id'])
        product.user=user
    product.name=product_data['name']
    product.price=product_data['price']
    product.brand=product_data['brand']
    product.countInStock=product_data['countInStock']
    product.category=product_data['category']
    product.description=product_data['description']
    
    product.save()
    serializer=ProductSerializer(product,many=False) #as we are asking for one item
    return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def uploadImage(request):
    data=request.data

    product_id=data['product_id']
    product=Product.objects.get(_id=product_id)
    product.image=request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')
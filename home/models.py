from django.db import models
from django.contrib.auth.models import User
import uuid

# DRY ==> donot repeat yourself

class BaseModel(models.Model):
    uid=models.UUIDField(default=uuid.uuid4,editable=False,primary_key=True)
    created_at=models.DateField(auto_now_add=True)
    updated_at=models.DateField(auto_now_add=True)


    # we dont have to create model for this as this is to be treated as class so to do this
    class Meta:
        abstract=True




# Create your models here.

    

class PizzaCategory(BaseModel):
    category_name=models.CharField(max_length=100)

class Pizza(BaseModel):
    category=models.ForeignKey(PizzaCategory,on_delete=models.CASCADE,related_name="pizzas")
    pizza_name=models.CharField(max_length=100)
    price=models.IntegerField(default=100)
    images=models.ImageField(upload_to='pizza')

class Cart(BaseModel):
    user=models.ForeignKey(User,null=True,blank=True,on_delete=models.SET_NULL,related_name='carts')
    is_paid=models.BooleanField(default=False)

class CartItems(BaseModel):
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE,related_name="cart_items")  #to say whose cart it is
    pizza=models.ForeignKey(Pizza, on_delete=models.CASCADE)

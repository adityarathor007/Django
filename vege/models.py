from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .utils import generate_slug
User=get_user_model()

# Create your models here.

class Recipe(models.Model):
    #  a ForeignKey is a fundamental concept used to create relationships between tables. It's a field (or collection of fields) in a database table that essentially points to the primary key of another table
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True) #when a user gets deleted then all the recipes associated with it will get deleter
    recipe_name=models.CharField(max_length=100)
    slug=models.SlugField(unique=True)
    recipe_desc=models.TextField()
    recipe_image=models.ImageField(upload_to="recipe")
    recipe_view_count=models.IntegerField(default=1)


    def save(self,*args,**kwargs):
        # print("hello")
        self.slug=generate_slug(self.recipe_name)  #generated slug using recipe_name
        super(Recipe,self).save(*args,**kwargs)


from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Recipe(models.Model):
    #  a ForeignKey is a fundamental concept used to create relationships between tables. It's a field (or collection of fields) in a database table that essentially points to the primary key of another table
    user=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True) #when a user gets deleted then all the recipes associated with it will get deleter
    recipe_name=models.CharField(max_length=100)
    recipe_desc=models.TextField()
    recipe_image=models.ImageField(upload_to="recipe")
    recipe_view_count=models.IntegerField(default=1)

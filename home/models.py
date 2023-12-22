from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


class Student(models.Model):
    name=models.CharField(max_length=100)
    age=models.IntegerField()
    email=models.EmailField()
    address=models.TextField(null=True,blank=True)
    file=models.FileField()
    image=models.ImageField()

# on doing migrate it saves a state of model

class Car(models.Model):
    car_name=models.CharField(max_length=500)
    speed=models.IntegerField(default=50)

    def __str__(self):
        return self.car_name   


# signal is for example whenrver Car object is created certain action can be done
    # pre-save,post-save,pre-delete,post-delete 



# this can be used to track user behaviour as this will be called only when object is created or deleted
@receiver(post_save,sender=Car)
def call_car_api(sender,instance,**kwargs):
    print('CAR OBJECT CREATED')
    print(sender,instance,kwargs)


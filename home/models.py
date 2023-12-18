from django.db import models

# Create your models here.


class Student(models.Model):
    name=models.CharField(max_length=100)
    age=models.IntegerField()
    email=models.EmailField()
    address=models.TextField(null=True,blank=True)
    file=models.FileField()
    image=models.ImageField()



class Car(models.Model):
    car_name=models.CharField(max_length=500)
    speed=models.IntegerField(default=50)

    def __str__(self):
        return self.car_name


# on doing migrate it saves a state of model
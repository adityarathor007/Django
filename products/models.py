from django.db import models
import uuid

# DRY ==> donot repeat yourself

class BaseModel(models.Model):
    uid=models.UUIDField(default=uuid.uuid4,editable=False,primary_key=True)
    created_at=models.DataField(auto_created=True)
    updated_at=models.DataField(auto_created=True)


    # we dont have to create model for this as this is to be treated as class so to do this
    class Meta:
        abstract=True




# Create your models here.
class Product(BaseModel):
    product_name=models.CharField(max_length=100)
    product_slug=models.SlugField(unique=True)
    product_description=models.TextField()
    product_price=models.IntegerField(default=0)
    product_demo_price=models.IntegerField(default=0)
    



class ProductMetaInformation(BaseModel):
    product=models.OneToOneField(Product,on_delete=models.CASCADE)  #as each product will have only one metainfo
    quantity=models.CharField(null=True,blank=True)
    product_unit_measure=models.CharField(max_length=100,null=True,blank=True,choices=(("KG","KG"),("ML","ML"),("L","L"),(None,None)))
    is_restrict=models.BooleanField(default=False)
    restrict_quantity=models.IntgerField()


class ProductImages(BaseModel):
    product=models.Model(Product,on_delete=models.CASCADE)
    product_image=models.ImageField(upload_to="products")
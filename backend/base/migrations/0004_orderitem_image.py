# Generated by Django 5.0.3 on 2024-03-17 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]

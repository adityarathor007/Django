# Generated by Django 5.0.3 on 2024-03-27 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_review_createdat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='review',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
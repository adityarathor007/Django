# Generated by Django 4.2.6 on 2023-12-16 09:47

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("vege", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="recipe",
            name="recipe_image",
            field=models.ImageField(upload_to="recipe"),
        ),
    ]

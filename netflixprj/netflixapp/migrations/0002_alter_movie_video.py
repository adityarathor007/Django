# Generated by Django 5.0 on 2024-01-04 17:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("netflixapp", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="movie",
            name="video",
            field=models.ManyToManyField(blank=True, null=True, to="netflixapp.video"),
        ),
    ]

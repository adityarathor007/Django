# Generated by Django 4.2.6 on 2023-12-19 05:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("campusHub", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Subject",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("subject_name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="SubjectMarks",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("marks", models.IntegerField()),
                (
                    "student",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="studentmarks",
                        to="campusHub.student",
                    ),
                ),
                (
                    "subject",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="campusHub.subject",
                    ),
                ),
            ],
            options={
                "unique_together": {("student", "subject")},
            },
        ),
    ]
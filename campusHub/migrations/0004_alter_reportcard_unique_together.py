# Generated by Django 4.2.6 on 2023-12-20 08:39

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("campusHub", "0003_reportcard"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="reportcard",
            unique_together={("student_rank", "date_of_report_card_generation")},
        ),
    ]

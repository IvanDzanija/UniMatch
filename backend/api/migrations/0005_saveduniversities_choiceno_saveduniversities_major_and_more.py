# Generated by Django 4.2.18 on 2025-01-18 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_saveduniversities_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='saveduniversities',
            name='choiceNo',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='saveduniversities',
            name='major',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='saveduniversities',
            name='website',
            field=models.CharField(max_length=200, null=True),
        ),
    ]

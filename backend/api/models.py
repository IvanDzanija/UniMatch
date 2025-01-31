from django.db import models
from picklefield.fields import PickledObjectField

# Create your models here.



class savedUniversities(models.Model):
   name = models.CharField(max_length=150)
   country = models.CharField(max_length=150)
   rank = models.IntegerField()
   acc = models.FloatField()
   estimatedCost = models.FloatField()
   #major = models.CharField(max_length=100,null=True)
   website = models.CharField(max_length=200,null=True)
   #choiceNo = models.IntegerField(default=0)
   lng = models.FloatField()
   lat = models.FloatField()

    

class University(models.Model):
    country = models.CharField(max_length=150)
    region = models.CharField(max_length=150)
    name =   models.CharField(max_length=150)
    rank =  models.IntegerField()
    tuition =  models.FloatField()
    internationalStudentRatio = models.FloatField()
    acceptanceRate = models.FloatField()
    safetyIndex =  models.FloatField()
    costOfLiving =  models.FloatField()
    rentCost=  models.FloatField()
    groceryCost=  models.FloatField()
    transportCost=  models.FloatField()
    recreationCost=  models.FloatField()
    healthcareCost=  models.FloatField()
    estimatedCost=  models.FloatField()
    website = models.CharField(max_length=200)
    computerScience = models.BooleanField()
    business = models.BooleanField()
    economics= models.BooleanField()
    psychology= models.BooleanField()
    biology= models.BooleanField()
    law= models.BooleanField()
    medicine= models.BooleanField()
    mathematics= models.BooleanField()
    art= models.BooleanField()
    physics= models.BooleanField()


class Uni(models.Model):
      name = models.CharField(max_length=150)
      country = models.CharField(max_length=150)
      rank = models.IntegerField()
      acc = models.FloatField()
      estimatedCost = models.FloatField()
      major = models.CharField(max_length=100,null=True)
      website = models.CharField(max_length=200,null=True)
      choiceNo = models.IntegerField(default=0)
      lng = models.FloatField()
      lat = models.FloatField()



  # You can use this field for PostgreSQL. For other databases, TextField can be used.

class SearchHistoryItem(models.Model):
    user_id = models.IntegerField()
    inputInformation = PickledObjectField()# Use JSONField to store the Forma object data
    results = models.ManyToManyField(Uni)  # Use JSONField to store the Uni object data


    #created_at = models.DateTimeField(auto_now_add=True)
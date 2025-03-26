from django.db import models


# Create your models here.

class Forma(models.Model):
  
   continent = models.CharField(max_length=100, null=True, blank=True)
   rankMin = models.FloatField()
   rankMax = models.FloatField()
   rankPrio = models.TextField()

   safetyMin = models.TextField()
   safetyMax = models.TextField()
   safetyPrio = models.TextField()

   accMin = models.FloatField()
   accMax = models.FloatField()
   accPrio = models.TextField()

   ISRMin = models.FloatField()
   ISRMax = models.FloatField()
   ISRPrio  = models.TextField()

   CoLMin = models.FloatField()
   CoLMax = models.FloatField()
   CoLPrio = models.TextField()

   rentMin = models.FloatField()
   rentMax = models.FloatField()
   rentPrio = models.TextField()

   groceryMin = models.FloatField()
   groceryMax = models.FloatField()
   groceryPrio  =models.TextField()

   transportMin = models.FloatField()
   transportMax = models.FloatField()
   transportPrio = models.TextField()

   recreationMin = models.FloatField()
   recreationMax = models.FloatField()
   recreationPrio = models.TextField()

   healthcareBudgetMin = models.FloatField()
   healthcareBudgetMax = models.FloatField()
   healthcareBudgetPrio = models.TextField()

   tuitionBudgetMin = models.FloatField()
   tuitionBudgetMax = models.FloatField()
   tuitionBudgetPrio = models.TextField()

   major = models.TextField()



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


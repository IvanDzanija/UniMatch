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
   city = models.CharField(max_length=150)
   rank = models.IntegerField()
   acc = models.FloatField()
   estimatedCost = models.FloatField()

    
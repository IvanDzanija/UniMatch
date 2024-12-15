from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render
import json
from .models import Forma
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def forma(request):
   
   if(request.method=='POST'):
      try:
         data = json.loads(request.body)
         

         continent = data['info'].get('continent')
         print(continent)
         rankMin = data["info"].get('rankMin')
         rankMax = data["info"].get('rankMax')
         rankPrio = data["info"].get('rankPrio')

         safetyMin= data["info"].get('safetyMin')
         safetyMax= data["info"].get('safetyMax')
         safetyPrio = data["info"].get('safetyPrio')
         
         accMin = data["info"].get('accMin')
         accMax = data["info"].get('accMax')
         accPrio = data["info"].get('accPrio')

         ISRMin = data["info"].get('ISRMin')
         ISRMax = data["info"].get('ISRMax')
         ISRPrio = data["info"].get('ISRPrio')

         CoLMin = data["info"].get('CoLMin')
         CoLMax = data["info"].get('CoLMax')
         CoLPrio = data["info"].get('CoLPrio')

         rentMin = data["info"].get('rentMin')

         rentMax = data["info"].get('rentMax')
         rentPrio = data["info"].get('rentPrio')

         groceryMin = data["info"].get('groceryMin')
         groceryMax = data["info"].get('groceryMax')
         groceryPrio = data["info"].get('groceryPrio')

         transportMin=  data["info"].get('transportMin')
         transportMax = data["info"].get('transportMax')
         transportPrio = data["info"].get('transportPrio')

         recreationMin = data["info"].get('recreationMin')
         recreationMax = data["info"].get('recreationMax')
         recreationPrio = data["info"].get('recreationPrio')
         
         healthcareBudgetMin = data["info"].get('healthcareBudgetMin')
         healthcareBudgetMax = data["info"].get('healthcareBudgetMax')
         healthcareBudgetPrio = data["info"].get('healthcareBudgetPrio')

         tuitionBudgetMin = data["info"].get('tuitionBudgetMin')
         tuitionBudgetMax = data["info"].get('tuitionBudgetMax')
         tuitionBudgetPrio = data["info"].get('tuitionBudgetPrio')

         major = data["info"].get('major')

         new_form = Forma(
      continent=continent,
      rankMin=rankMin,
      rankMax=rankMax,
      rankPrio=rankPrio,
      safetyMin=safetyMin,
      safetyMax=safetyMax,
      safetyPrio=safetyPrio,
      accMin=accMin,
      accMax=accMax,
      accPrio=accPrio,
      ISRMin=ISRMin,
      ISRMax=ISRMax,
      ISRPrio=ISRPrio,
      CoLMin=CoLMin,
      CoLMax=CoLMax,
      CoLPrio=CoLPrio,
      rentMin=rentMin,
      rentMax=rentMax,
      rentPrio=rentPrio,
      groceryMin=groceryMin,
      groceryMax=groceryMax,
      groceryPrio=groceryPrio,
      transportMin=transportMin,
      transportMax=transportMax,
      transportPrio=transportPrio,
      recreationMin=recreationMin,
      recreationMax=recreationMax,
      recreationPrio=recreationPrio,
      healthcareBudgetMin=healthcareBudgetMin,
      healthcareBudgetMax=healthcareBudgetMax,
      healthcareBudgetPrio=healthcareBudgetPrio,
      tuitionBudgetMin=tuitionBudgetMin,
      tuitionBudgetMax=tuitionBudgetMax,
      tuitionBudgetPrio=tuitionBudgetPrio,
      major=major
   )
        # filter(new_form)
         print(data)
         new_form.save()

         

      except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
      return JsonResponse({'status': 'success', 'message': 'Resource created successfully'}, status=201)
   else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)     
   

def getSavedUniversities(request):
   
      
   return 0
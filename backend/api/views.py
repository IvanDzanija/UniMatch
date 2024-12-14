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

         continent = data.get('continent')
         rankMin = data.get('rankMin')
         rankMax = data.get('rankMax')
         rankPrio = data.get('rankPrio')

         safetyMin= data.get('safetyMin')
         safetyMax= data.get('safetyMax')
         safetyPrio = data.get('safetyPrio')
         
         accMin = data.get('accMin')
         accMax = data.get('accMax')
         accPrio = data.get('accPrio')

         ISRMin = data.get('ISRMin')
         ISRMax = data.get('ISRMax')
         ISRPrio = data.get('ISRPrio')

         CoLMin = data.get('CoLMin')
         CoLMax = data.get('CoLMax')
         CoLPrio = data.get('CoLPrio')

         rentMin = data.get('rentMin')
         rentMax = data.get('rentMax')
         rentPrio = data.get('rentPrio')

         groceryMin = data.get('groceryMin')
         groceryMax = data.get('groceryMax')
         groceryPrio = data.get('groceryPrio')

         transportMin=  data.get('transportMin')
         transportMax = data.get('transportMax')
         transportPrio = data.get('transportPrio')

         recreationMin = data.get('recreationMin')
         recreationMax = data.get('recreationMax')
         recreationPrio = data.get('recreationPrio')
         
         healthcareBudgetMin = data.get('healthcareBudgetMin')
         healthcareBudgetMax = data.get('healthcareBudgetMax')
         healthcareBudgetPrio = data.get('healthcareBudgetPrio')

         tuitionBudgetMin = data.get('tuitionBudgetMin')
         tuitionBudgetMax = data.get('tuitionBudgetMax')
         tuitionBudgetPrio = data.get('tuitionBudgetPrio')

         major = data.get('major')

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
         new_form.save()

         print(data)

      except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
      return JsonResponse({'status': 'success', 'message': 'Resource created successfully'}, status=201)
   else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)     
   


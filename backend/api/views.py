from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render
import json
import pandas as pd 
from .models import Forma
import os
# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import savedUniversities
from authentication.models import User

from authentication.serializers import UserSerializer,SavedUniversitySerializer

def load_data():
    dataset_path = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),  
            '..',                       
            '..',                       
            'datasets',                 
            'LLM_generated',         
            'pricesLLMGlobal.csv'       
        )
    )
    data = pd.read_csv(dataset_path)
    return data

def load_date2():
    dataset_path = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),  
            '..',                       
            '..',                       
            'datasets',                 
            'LLM_generated',         
            'indexLLM.csv'       
        )
    )
    data = pd.read_csv(dataset_path)
    return data

@csrf_exempt
def forma(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
           
           
            universities = load_data()
            index_complete = load_date2()

            safety_mapping = {
                'low-safety': 0,
                'medium-low-safety': 1,
                'medium-safety': 2,
                'medium-high-safety': 3,
                'high-safety': 4
            }
            print(universities.columns)
            universities['safetyCategoryNum'] = universities['SafetyCategory'].map({
               'low-safety': 0,
               'medium-low-safety': 1,
               'medium-safety': 2,
               'medium-high-safety': 3,
               'high-safety': 4
            })

            universities = universities.merge(index_complete[['University', 'LivingCostIndex', 'RentIndex', 'GroceriesIndex', 'RecreationIndex', 'HealthcareIndex', 'TransportIndex']],
                                              how='left', on='University')

            
            filters = {
                'Ranking': (data["info"].get('rankMin'), data["info"].get('rankMax')),
                'SafetyCategory': (data["info"].get('safetyMin'), data["info"].get('safetyMax')),
                'Tuition': (data["info"].get('tuitionBudgetMin'), data["info"].get('tuitionBudgetMax')),
                'PercOfIntStud': (data["info"].get('ISRMin'), data["info"].get('ISRMax')),
                'AcceptanceRate': (data["info"].get('accMin'), data["info"].get('accMax')),
                'LivingCost': (data["info"].get('CoLMin'), data["info"].get('CoLMax')),
                'RentCost': (data["info"].get('rentMin'), data["info"].get('rentMax')),
                'GroceriesCost': (data["info"].get('groceryMin'), data["info"].get('groceryMax')),
                'RecreationCost': (data["info"].get('recreationMin'), data["info"].get('recreationMax')),
                'HealthcareCost': (data["info"].get('healthcareBudgetMin'), data["info"].get('healthcareBudgetMax')),
                'TransportCost': (data["info"].get('transportMin'), data["info"].get('transportMax')),
                'region': data["info"].get('continent'),
                'Major': data["info"].get('major')
            }

            rank_prio = data["info"].get('rankPrio')
            safety_prio = data["info"].get('safetyPrio')
            tuition_prio = data["info"].get('tuitionBudgetPrio')
            ISR_prio = data["info"].get('ISRPrio')
            acc_prio = data["info"].get('accPrio')
            CoL_prio = data["info"].get('CoLPrio')  
            rent_prio = data["info"].get('rentPrio')
            grocery_prio = data["info"].get('groceryPrio')
            recreation_prio = data["info"].get('recreationPrio')
            healthcare_prio = data["info"].get('healthcareBudgetPrio')
            transport_prio = data["info"].get('transportPrio')

            priority_mapping = {
                'Ranking': rank_prio,
                'Tuition': tuition_prio,
                'PercOfIntStud': ISR_prio,
                'AcceptanceRate': acc_prio,
                'LivingCost': CoL_prio,
                'RentCost': rent_prio,
                'GroceriesCost': grocery_prio,
                'RecreationCost': recreation_prio,
                'HealthcareCost': healthcare_prio,
                'TransportCost': transport_prio
            }

            major = data["info"].get('major')
            for column, value in filters.items():
                safety_prio = 0
                if column == 'SafetyCategory':
                    if safety_prio != 0: 
                        if value[0] is not None:  
                            min_val = safety_mapping.get(value[0], value[0])
                            universities = universities[universities['safetyCategoryNum'] >= min_val]
                        if value[1] is not None: 
                            max_val = safety_mapping.get(value[1], value[1])
                            universities = universities[universities['safetyCategoryNum'] <= max_val]
                elif column == 'region' and value:  
                    universities = universities[universities['region'] == value]
                elif column == 'Major' and value:  
                    universities = universities[universities[value] == 1]
                elif isinstance(value, tuple): 
                    priority = priority_mapping.get(column)
                    if priority != 0: 
                        min_val, max_val = value
                        if min_val is not None:
                            universities = universities[universities[column] >= min_val]
                        if max_val is not None:
                            universities = universities[universities[column] <= max_val]

            
            filtered_universities = universities.to_dict(orient='records')
            #print(data)
            #print(filtered_universities)


            universities['score'] = 0

            universities['score'] += universities['Ranking'] * rank_prio
            universities['score'] += universities['SafetyIndex'] * safety_prio
            universities['score'] += universities['Tuition'] * tuition_prio
            #universities['score'] += universities['percOfIntStud'] * ISR_prio
            universities['score'] += universities['AcceptanceRate'] * acc_prio
            universities['score'] += universities['LivingCostIndex'] * CoL_prio
            universities['score'] += universities['RentIndex'] * rent_prio
            universities['score'] += universities['GroceriesIndex'] * grocery_prio
            universities['score'] += universities['RecreationIndex'] * recreation_prio
            universities['score'] += universities['HealthcareIndex'] * healthcare_prio
            universities['score'] += universities['TransportIndex'] * transport_prio

            top_universities = universities.sort_values(by='score', ascending=True).head(10)

            filtered_universities = top_universities.to_dict(orient='records')
            new_filtered_universities = []
            brojac = 1
            for uni in filtered_universities:
                uni2  = universities[universities['Ranking']==uni.get('Ranking')]
                lat = uni2['Latitude'].iloc[0]
                lng = uni2['Longitude'].iloc[0]
                new_filtered_universities.append(
                                    {
                    'name': uni.get('University'),
                    'country': uni.get('Country'),
                    'rank': uni.get('Ranking'),
                    'acc': uni.get('AcceptanceRate'),
                    'estimatedCost': uni.get('Tuition'),
                    'major': major,
                    'website': uni.get('Link'),
                    'choiceNo': brojac,
                    'lat':float(lat),
                    'lng':float(lng)
                    }
                )
                brojac+=1
            #print("Filtered unis: ")
            print(new_filtered_universities)
            return JsonResponse({'status': 'success', 'data': new_filtered_universities}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def addUni(request):
       try:
        body = json.loads(request.body)
        user = request.user
        body = body.get("university")
        print(user.username)    
        print("body = ", body)
        name = body.get("name")
        country = body.get("country")
        rank = body.get("rank")
        acc = body.get("acc")
        estimatedCost = body.get("estimatedCost")
        #major = body.get("major")
        website = body.get("website")
        #choiceNo = body.get("choiceNo")
        user2 = User.objects.get(username=user.username)
        zastava = False
        for uni in user2.universities_saved.all():
            if(uni.name==name):
                zastava = True
        #uni = savedUniversities.objects.get(name=name)
        if zastava is False:
            savedUni = savedUniversities(name=name,country=country,rank=rank,acc=acc,estimatedCost=estimatedCost,website=website)
       
            savedUni.save()
            user2.universities_saved.add(savedUni) 
            user2.save()
        for uni in user2.universities_saved.all():
            print(uni.name)
        uni = savedUniversities.objects.get(name=name)
        print(uni.acc)
        
        return JsonResponse({'status': 'success', 'data':user2 }, status=201)

       except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

  

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUniversitiesSaved(request):
    print("dosao")
    user = request.user

    user2 = User.objects.get(id=user.id)
    unis = user2.universities_saved.all()

    lista = []
    for uni in unis:
        uni2 = SavedUniversitySerializer(uni)
        lista.append(uni2.data)
    
    return JsonResponse({'status': 'success', 'data': lista}, status=200)




@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def removeUni(request):
    user = request.user
    body = json.loads(request.body)
    
    print("body = ", body)
    uni_id = body.get("id")

    user2 = User.objects.get(id= user.id)
    lista = []
    lista2 = []
    for uni in user2.universities_saved.all():
        if(uni_id == uni.id):
            continue
        lista2.append(uni)
        uni = SavedUniversitySerializer(uni)
        lista.append(uni.data)

    user2.universities_saved.set(lista2)
    user2.save()
    return JsonResponse({'status': 'success', 'data': user2}, status=200)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def showUniInfo(request, rank):
    print(rank)
    data = load_data()
    
   
    data['ranking'] = pd.to_numeric(data['ranking'], errors='coerce')
    

    row = data[data['ranking'] == rank]
    
    
    if row.empty:
        return JsonResponse({'status': "error", 'message': f"No university found with rank {rank}"})
    
    
    row_dict = row.to_dict(orient='records')[0]  
    
    print(row)
    return JsonResponse({'status': "success", 'data': row_dict})

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
            'completeDatasets',         
            'pricesComplete2.csv'       
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
            'completeDatasets',         
            'indexComplete.csv'       
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

            universities['safetyCategoryNum'] = universities['safetyCategory'].map({
               'low-safety': 0,
               'medium-low-safety': 1,
               'medium-safety': 2,
               'medium-high-safety': 3,
               'high-safety': 4
            })

            universities = universities.merge(index_complete[['university', 'livingCostIndex', 'rentIndex', 'groceriesIndex', 'recreationIndex', 'healthcareIndex', 'transportIndex']],
                                              how='left', on='university')

            
            filters = {
                'ranking': (data["info"].get('rankMin'), data["info"].get('rankMax')),
                'safetyCategory': (data["info"].get('safetyMin'), data["info"].get('safetyMax')),
                'tuition': (data["info"].get('tuitionBudgetMin'), data["info"].get('tuitionBudgetMax')),
                'percOfIntStud': (data["info"].get('ISRMin'), data["info"].get('ISRMax')),
                'acceptanceRate': (data["info"].get('accMin'), data["info"].get('accMax')),
                'livingCost': (data["info"].get('CoLMin'), data["info"].get('CoLMax')),
                'rentCost': (data["info"].get('rentMin'), data["info"].get('rentMax')),
                'groceriesCost': (data["info"].get('groceryMin'), data["info"].get('groceryMax')),
                'recreationCost': (data["info"].get('recreationMin'), data["info"].get('recreationMax')),
                'healthcareCost': (data["info"].get('healthcareBudgetMin'), data["info"].get('healthcareBudgetMax')),
                'transportCost': (data["info"].get('transportMin'), data["info"].get('transportMax')),
                'region': data["info"].get('continent'),
                'major': data["info"].get('major')
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
                'ranking': rank_prio,
                'tuition': tuition_prio,
                'percOfIntStud': ISR_prio,
                'acceptanceRate': acc_prio,
                'livingCost': CoL_prio,
                'rentCost': rent_prio,
                'groceriesCost': grocery_prio,
                'recreationCost': recreation_prio,
                'healthcareCost': healthcare_prio,
                'transportCost': transport_prio
            }

            major = data["info"].get('major')
            for column, value in filters.items():
                if column == 'safetyCategory':
                    if safety_prio != 0: 
                        if value[0] is not None:  
                            min_val = safety_mapping.get(value[0], value[0])
                            universities = universities[universities['safetyCategoryNum'] >= min_val]
                        if value[1] is not None: 
                            max_val = safety_mapping.get(value[1], value[1])
                            universities = universities[universities['safetyCategoryNum'] <= max_val]
                elif column == 'region' and value:  
                    universities = universities[universities['region'] == value]
                elif column == 'major' and value:  
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

            universities['score'] += universities['ranking'] * rank_prio
            universities['score'] += universities['safetyIndex'] * safety_prio
            universities['score'] += universities['tuition'] * tuition_prio
            #universities['score'] += universities['percOfIntStud'] * ISR_prio
            universities['score'] += universities['acceptanceRate'] * acc_prio
            universities['score'] += universities['livingCostIndex'] * CoL_prio
            universities['score'] += universities['rentIndex'] * rent_prio
            universities['score'] += universities['groceriesIndex'] * grocery_prio
            universities['score'] += universities['recreationIndex'] * recreation_prio
            universities['score'] += universities['healthcareIndex'] * healthcare_prio
            universities['score'] += universities['transportIndex'] * transport_prio

            top_universities = universities.sort_values(by='score', ascending=True).head(10)

            filtered_universities = top_universities.to_dict(orient='records')
            new_filtered_universities = []
            brojac = 1
            for uni in filtered_universities:
                
                new_filtered_universities.append(
                                    {
                    'name': uni.get('university'),
                    'country': uni.get('country'),
                    'rank': uni.get('ranking'),
                    'acc': uni.get('acceptanceRate'),
                    'estimatedCost': uni.get('tuition'),
                    'major': major,
                    'website': uni.get('link'),
                    'choiceNo': brojac
                    }
                )
                brojac+=1
            #print("Filtered unis: ")
            #print(new_filtered_universities)
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
        print(user.username)    
        print("body = ", body)
        name = body.get("name")
        country = body.get("country")
        rank = body.get("rank")
        acc = body.get("acc")
        estimatedCost = body.get("estimatedCost")
        major = body.get("major")
        website = body.get("website")
        choiceNo = body.get("choiceNo")
        user2 = User.objects.get(username=user.username)
        zastava = False
        for uni in user2.universities_saved.all():
            if(uni.name==name):
                zastava = True
        #uni = savedUniversities.objects.get(name=name)
        if zastava is False:
            savedUni = savedUniversities(name=name,country=country,rank=rank,acc=acc,estimatedCost=estimatedCost,major=major,website=website,choiceNo=choiceNo)
       
            savedUni.save()
            user2.universities_saved.add(savedUni) 
        
        for uni in user2.universities_saved.all():
            print(uni.name)
        uni = savedUniversities.objects.get(name=name)
        print(uni.acc)

        return JsonResponse({'status': 'success', 'data': True}, status=201)

       except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)

  

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUniversitiesSaved(request):
    user = request.user

    user2 = User.objects.get(id=user.id)
    unis = user2.universities_saved.all()

    lista = []
    for uni in unis:
        uni2 = SavedUniversitySerializer(uni)
        lista.append(uni2.data)
    
    return JsonResponse({'status': 'success', 'data': lista}, status=200)



from rest_framework import serializers
from .models import User  
from api.models import savedUniversities, Forma  

class SavedUniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = savedUniversities
        fields = ['id', 'name', 'country', 'rank', 'acc', 'estimatedCost', 'website']  

class FormaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Forma
        fields = [
            'continent',
            'rankMin', 'rankMax', 'rankPrio',
            'safetyMin', 'safetyMax', 'safetyPrio',
            'accMin', 'accMax', 'accPrio',
            'ISRMin', 'ISRMax', 'ISRPrio',
            'CoLMin', 'CoLMax', 'CoLPrio',
            'rentMin', 'rentMax', 'rentPrio',
            'groceryMin', 'groceryMax', 'groceryPrio',
            'transportMin', 'transportMax', 'transportPrio',
            'recreationMin', 'recreationMax', 'recreationPrio',
            'healthcareBudgetMin', 'healthcareBudgetMax', 'healthcareBudgetPrio',
            'tuitionBudgetMin', 'tuitionBudgetMax', 'tuitionBudgetPrio',
           
        ]


class UserSerializer(serializers.ModelSerializer):
    universities_saved = SavedUniversitySerializer(many=True, read_only=True)  
    forma = FormaSerializer(many=False,read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'universities_saved','forma']  


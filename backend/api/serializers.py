from rest_framework import serializers
from .models import SearchHistoryItem, Uni,University
from .forms import Forma  # Import Forma class


from rest_framework import serializers
from .forms import Forma  # Assuming Forma is a class, not a model

class FormaSerializer(serializers.Serializer):
    continent = serializers.CharField(required=False, allow_blank=True)  # String field, allows empty strings
    rankMin = serializers.FloatField(required=False, allow_null=True)  # Numeric field, allows nulls
    rankMax = serializers.FloatField(required=False, allow_null=True)
    rankPrio = serializers.IntegerField(required=False, allow_null=True)  # Numeric priority
    safetyMin = serializers.CharField(required=False, allow_blank=True)
    safetyMax = serializers.CharField(required=False, allow_blank=True)
    safetyPrio = serializers.IntegerField(required=False, allow_null=True)
    accMin = serializers.FloatField(required=False, allow_null=True)
    accMax = serializers.FloatField(required=False, allow_null=True)
    accPrio = serializers.IntegerField(required=False, allow_null=True)
    ISRMin = serializers.FloatField(required=False, allow_null=True)
    ISRMax = serializers.FloatField(required=False, allow_null=True)
    ISRPrio = serializers.IntegerField(required=False, allow_null=True)
    CoLMin = serializers.FloatField(required=False, allow_null=True)
    CoLMax = serializers.FloatField(required=False, allow_null=True)
    CoLPrio = serializers.IntegerField(required=False, allow_null=True)
    rentMin = serializers.FloatField(required=False, allow_null=True)
    rentMax = serializers.FloatField(required=False, allow_null=True)
    rentPrio = serializers.IntegerField(required=False, allow_null=True)
    groceryMin = serializers.FloatField(required=False, allow_null=True)
    groceryMax = serializers.FloatField(required=False, allow_null=True)
    groceryPrio = serializers.IntegerField(required=False, allow_null=True)
    transportMin = serializers.FloatField(required=False, allow_null=True)
    transportMax = serializers.FloatField(required=False, allow_null=True)
    transportPrio = serializers.IntegerField(required=False, allow_null=True)
    recreationMin = serializers.FloatField(required=False, allow_null=True)
    recreationMax = serializers.FloatField(required=False, allow_null=True)
    recreationPrio = serializers.IntegerField(required=False, allow_null=True)
    healthcareBudgetMin = serializers.FloatField(required=False, allow_null=True)
    healthcareBudgetMax = serializers.FloatField(required=False, allow_null=True)
    healthcareBudgetPrio = serializers.IntegerField(required=False, allow_null=True)
    tuitionBudgetMin = serializers.FloatField(required=False, allow_null=True)
    tuitionBudgetMax = serializers.FloatField(required=False, allow_null=True)
    tuitionBudgetPrio = serializers.IntegerField(required=False, allow_null=True)
    major = serializers.CharField(required=False, allow_blank=True)  # String field, allows empty strings

class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = '__all__'  

class UniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Uni
        fields = ['id', 'name', 'country', 'rank', 'acc', 'estimatedCost', 'major', 'website', 'choiceNo', 'lng', 'lat']

class SearchHistoryItemSerializer(serializers.ModelSerializer):
    inputInformation = FormaSerializer() 
    results = UniSerializer(many=True)  

    class Meta:
        model = SearchHistoryItem
        fields = ['id', 'user_id', 'inputInformation', 'results']
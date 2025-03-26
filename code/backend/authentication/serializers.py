from rest_framework import serializers
from .models import User  
from api.models import savedUniversities, Forma  

class SavedUniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = savedUniversities
        fields = ['id', 'name', 'country', 'rank', 'acc', 'estimatedCost', 'website','lng','lat']  




class UserSerializer(serializers.ModelSerializer):
    universities_saved = SavedUniversitySerializer(many=True, read_only=True)  
   
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'universities_saved']  


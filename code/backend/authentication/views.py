from django.shortcuts import render
import json
#from . models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
# Create your views here.
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt


from .backends import AuthenticationBackend
from rest_framework_simplejwt.tokens import RefreshToken


from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from authentication.serializers import UserSerializer,SavedUniversitySerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
User = get_user_model()




@csrf_exempt
def register(request):
   if(request.method == "POST"):
      try:
         data = json.loads(request.body)

         username = data.get("username")
         password = data.get("password")
         email = data.get("email")
         #drzava
         
         #
         if(User.objects.filter(username=username).exists()):
            return JsonResponse({'status': 'error', 'message': 'Username already taken!'}, status=400)
         user = User.objects.create_user(email=email, username=username,
                password=password,
                )
      except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
      return JsonResponse({'status': 'success', 'message': 'User created successfully'}, status=201)
   else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)


@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
           
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")
            print("username= ", username)
            print("pass= ", password)
            #print("pass2 = " , make_password(password))
           
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials (user not found)'}, status=401)
            print(f"Entered password: {password}")
            print(f"Stored password hash: {user.password}") 
           
            print(f"User found: {user.username}, Password stored: {user.password}")

            
            user = AuthenticationBackend().authenticate(request=request,username=username, password=password)
            print(user)
            # Check if user is authenticated
            if user is not None:
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                lista = []
                for uni in user.universities_saved.all():
                    uni = SavedUniversitySerializer(uni)
                    lista.append(uni.data)
                
                user = UserSerializer(user)
                user.universities_saved = lista
                
                
                return JsonResponse({
                    'status': 'success',
                    'message': 'Login successful',
                    'user': user.data,
                    'jwt': access_token,
                    'refresh_token': str(refresh)
                }, status=200)
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)
    



@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])

def validateSession(request):
    user = request.user

    user2 = User.objects.get(id = user.id)

    user2 = UserSerializer(user2)

    return JsonResponse({'status':'success','user': user2.data})
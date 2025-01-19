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
            # Parse the JSON data from the request
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
            # Debugging: Output user details to check if we're getting the correct user
            print(f"User found: {user.username}, Password stored: {user.password}")

            # Authenticate the user using the provided username and password
            user = AuthenticationBackend().authenticate(request=request,username=username, password=password)
            print(user)
            # Check if user is authenticated
            if user is not None:
                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                # Return the JWT tokens in the response
                return JsonResponse({
                    'status': 'success',
                    'message': 'Login successful',
                    'user': user.username,
                    'jwt': access_token,
                    'refresh_token': str(refresh)
                }, status=200)
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)
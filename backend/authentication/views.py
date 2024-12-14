from django.shortcuts import render
import json
from . models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password, check_password
# Create your views here.

from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def register(request):
   if(request.method == "POST"):
      try:
         data = json.loads(request.body)
         name = data.get("name")
         surname = data.get("surname")
         username = data.get("username")
         password = data.get("password")
         #drzava
         #hashed_password = make_password(password=password)
         #
         if(User.objects.filter(username=username).exists()):
            return JsonResponse({'status': 'error', 'message': 'Username already taken!'}, status=400)
         user = User.objects.create_user( username=username,
                password=password,
                name=name,
                surname=surname)
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
            
            # Find the user by username
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
            
            # Check the password
            if check_password(password, user.password):
                return JsonResponse({'status': 'success', 'message': 'Login successful', 'username': user.username}, status=200)
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    else:
        return JsonResponse({'status': 'error', 'message': 'Only POST requests are allowed'}, status=405)
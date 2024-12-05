from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db.models import Max
from .models import *
import json
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site


@csrf_exempt
def formSubmit(request):
    if request.method == "GET":
        return JsonResponse({"message": "Invalid request"}, status=400)
    else:

from django.contrib import admin
from django.urls import path, include
import views

app_name = "src"

urlpatterns = [
    path("api/submit", views.formSubmit),
]

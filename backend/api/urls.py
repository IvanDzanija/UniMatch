from django.urls import path 
from . import views


urlpatterns = [
    path("forma/",views.forma, name='forma'),
    path("add/",views.addUni,name='Uni'),
    path("getUniversitiesSaved/",views.getUniversitiesSaved, name="getSavedUniversities"),

]

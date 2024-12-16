from django.urls import path 
from . import views


urlpatterns = [
    path("forma/",views.forma, name='forma'),
    #path("getSavedUniversities/",views.getSavedUniversities, name="getSavedUniversities"),

]

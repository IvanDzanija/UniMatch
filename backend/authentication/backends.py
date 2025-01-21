
from django.contrib.auth.backends import BaseBackend
from .models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import get_user_model
class AuthenticationBackend(BaseBackend):
   def authenticate(self, request, username = ..., password = ..., **kwargs):
      User = get_user_model()
      try:
         user = User.objects.get(username=username)
         print(user.username)
         print(user.password)
         #print("check= ",check_password(password,user.password))
         if(user.check_password(password)):
            print("pass")
            return user
      except ObjectDoesNotExist:
         return None
      print("NONE")
      return None

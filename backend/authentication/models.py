from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password

from api.models import savedUniversities

class UserManager(BaseUserManager):
    def create_user(self,email, username, password,**extra_fields):
        if not username:
            raise ValueError('The Username field is required')

        # Set default fields for a regular user
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        # Create and save the user
        user = self.model(email = email,username=username, **extra_fields)
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    def create_superuser(self,email, username, password,  **extra_fields):
        # Set fields required for superusers
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        # Ensure proper flags for superusers
        if not extra_fields.get('is_staff'):
            raise ValueError('Superuser must have is_staff=True.')
        if not extra_fields.get('is_superuser'):
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password,  **extra_fields)


class User(AbstractUser):
    
    is_active = models.BooleanField(default=True)  # Active by default

    objects = UserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    universities_saved = models.ManyToManyField(savedUniversities, related_name='users')

    #REQUIRED_FIELDS = ['name', 'surname']

    def __str__(self):
        return self.username

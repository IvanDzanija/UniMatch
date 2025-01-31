from django.contrib import admin
from .models import savedUniversities,SearchHistoryItem,University,Uni
# Register your models here.

admin.site.register(savedUniversities)
admin.site.register(SearchHistoryItem)
admin.site.register(University)
admin.site.register(Uni)
from django.contrib import admin
from MyAPI import models
from MyAPI.models import MyUser
from MyAPI.models import Product
from django.contrib.auth.admin import UserAdmin
from django.db import models



class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', 'is_staff','Adresse')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'Adresse')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

class ProductManager(admin.ModelAdmin):
    list_display = ('id', 'Year', 'Make', 'Model', 'Trim', 'price', 'UserID')
    


admin.site.register(MyUser, CustomUserAdmin)
admin.site.register(Product, ProductManager)
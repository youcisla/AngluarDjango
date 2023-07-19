from rest_framework import serializers
from .models import MyUser
from MyAPI.models import Product

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'email', 'username', 'is_staff','Adresse', 'password')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "Year", "Make", "Model", "Trim", "price")

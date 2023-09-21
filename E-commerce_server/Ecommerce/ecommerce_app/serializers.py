from rest_framework import serializers
from .models import User, Product



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

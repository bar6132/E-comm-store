from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import RegexValidator
# Create your models here.


class Product(models.Model):
    ecommerce_categories = [
        ('Fashion and Apparel', 'Fashion and Apparel'),
        ('Electronics and Gadgets', 'Electronics and Gadgets'),
        ('Home and Furniture', 'Home and Furniture'),
        ('Health and Wellness', 'Health and Wellness'),
        ('Food and Groceries', 'Food and Groceries')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to='images/')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True, choices=ecommerce_categories)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
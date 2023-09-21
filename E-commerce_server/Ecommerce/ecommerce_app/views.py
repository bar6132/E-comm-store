import string
import random
from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from django.db import IntegrityError
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated


def say_hi(request):
    return HttpResponse("good start")


# def random_char(size):
#     return ''.join(random.choice(string.ascii_letters + "  ") for x in range(size))
#
#
# @api_view(['POST'])
# @csrf_exempt
# def create_random_products(request):
#     ecommerce_categories = [
#         'Fashion and Apparel',
#         'Electronics and Gadgets',
#         'Home and Furniture',
#         'Health and Wellness',
#         'Food and Groceries'
#     ]
#     user = User.objects.get(username="bar6132")
#     for _ in range(500):
#         name = random_char(size=random.randint(4, 15))
#         image = None  # You can add logic to generate or select random images here
#         brand = random_char(size=random.randint(4, 10))
#         category = random.choice(ecommerce_categories)
#         description = random_char(size=random.randint(15, 70))
#         price = random.uniform(1, 1000)  # Generates a random price between 1 and 1000
#
#         Product.objects.create(
#             user=user,  # You can specify the user if needed
#             name=name,
#             image=image,
#             brand=brand,
#             category=category,
#             description=description,
#             price=price
#         )
#     return Response("Product.objects.created", status=201)


@api_view(['POST'])
@csrf_exempt
def sign_up(request):
    """ Get data from request """
    username = request.data.get("username", None)
    password = request.data.get("password", None)
    email = request.data.get("email", None)

    if not username or not password or not email:
        return Response({'error': 'Missing required fields'}, status=400)

    try:
        user = User.objects.create_user(username=username, password=password, email=email)
    except IntegrityError:
        return Response({'error': 'Username already exists'}, status=400)

    token, created = Token.objects.get_or_create(user=user)

    data = {
        "message": f"New user created with ID: {user.id}",
        "token": token.key,
        'username': username,
        'email': email,
    }
    return Response(data, status=201)


@api_view(['GET'])
@csrf_exempt
def get_products(request, pk=None):
    if request.method == 'GET':
        if pk is None:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            serialized_data = serializer.data
            print(serialized_data)
            return Response(serialized_data)
        else:
            products = Product.objects.get(pk=pk)
            serializer = ProductSerializer(products)
            serialized_data = serializer.data
            return Response(serialized_data)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def product_view(request, pk=None):
    print(f"Authentication Methods: {request.authenticators}")
    print(f"User: {request.user}")
    if request.method == 'GET':
        if pk is None:
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            serialized_data = serializer.data
            return Response(serialized_data)
        else:
            products = Product.objects.get(pk=pk)
            serializer = ProductSerializer(products)
            serialized_data = serializer.data
            return Response(serialized_data)
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            user_data = {
                    'username': user.username,
                    'is_superuser': user.is_superuser,
            }
            if user_data['is_superuser']:
                serializer.save(user=user)
            else:
                return Response({"error": "You are not authorized to perform this action."},
                                status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"error": "Not Valid data"}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if pk is not None:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product, data=request.data)
            if serializer.is_valid():
                user = request.user
                user_data = {
                    'username': user.username,
                    'is_superuser': user.is_superuser,
                }
                if user_data['is_superuser']:
                    serializer.save(user=user)
                else:
                    return Response({"error": "You are not authorized to perform this action."},
                                    status=status.HTTP_403_FORBIDDEN)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':

        if pk is not None:
            product = Product.objects.get(pk=pk)
            user = request.user
            user_data = {
                'username': user.username,
                'is_superuser': user.is_superuser,
            }
            if user_data['is_superuser']:
                product.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"error": "You are not authorized to perform this action."},
                                status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"error": "Please provide a valid ID."}, status=status.HTTP_400_BAD_REQUEST)





from django.urls import path
from . import views
from django.contrib.auth.models import User
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.say_hi),
    # path('mega/', views.create_random_products),
    path('sign_up/', views.sign_up),
    path('products/', views.get_products),
    path('products/<int:pk>/', views.get_products),
    path('product-view/', views.product_view),
    path('product-view/<int:pk>/', views.product_view),

]
urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

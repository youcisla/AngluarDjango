"""
URL configuration for Django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from MyAPI import views
from MyAPI.views import Users


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.Users.logout),
    # # path('/', views.Users.logout),
    # path('home/', views.Login.login),
    path('SingUp', views.Register.as_view()),
    path('login', views.Login.as_view()),
    path('me', views.Users.as_view()),
    path('AddProduct', views.CreateProductView.as_view()),
    path('', views.GetProducts.as_view()),
    path('product', views.ManageMyProduct.as_view()),
    # path('product/<int:id>', views.ManageMyProduct.as_view(), name='product'),
]

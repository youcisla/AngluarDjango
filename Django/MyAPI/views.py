# from django.shortcuts import render
import string
from rest_framework. response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth import login, logout, authenticate
from MyAPI.serializers import  ProductSerializer, UserSerializer
from .models import *
from MyAPI.models import MyUser
import jwt
from rest_framework.decorators import parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser

# login = './User/login.html'
# home_page = './User/home.html'


# def base(request):
#     return render(request,'base.html')

# Create your views here.
class Register(TokenObtainPairView):
    serializer_class = UserSerializer
    def post(self, request):         # creer user
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        if not username:
            return Response({'error': 'Username is required'}, status=400)
        user = MyUser(username=username, email=email, password=password)
        user.set_password(password)
        user.save()
        return Response({'success': 'User created successfully'}, status=201)
    
    def get(self, request):       # Get tout user
        AllUser=MyUser.objects.all().values()
        return Response({"Message":"List of Users", "Users List":AllUser})


# @parser_classes([JSONParser])
class Login(TokenObtainPairView):
    def post(self, request):
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        user = authenticate(username=username, password=password)
        if (user is not None) :  
            request.session['id'] = user.id
            login(request, user)
            payload = {
            'id': request.user.id,
            'username': request.user.username
            }
            jwt_token = jwt.encode(payload, '1999', algorithm='HS256')
            # salah = jwt.decode(request.jwt_token, 'your_secret_key', algorithms=['HS256'])
            

            return Response({'jwt_token': jwt_token})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        

class Users(TokenObtainPairView):
    serializer_class = UserSerializer
    def get(self, request):     # Get user
        id = request.session.get('id')
        print(id)
        try:
            user = MyUser.objects.get(id=id)
            serializer = UserSerializer(user)
            if not user.is_staff:
                return Response(serializer.data)
            else:
                return (Register.get(self, request))                
        except MyUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request):    # Login user
        logout(request)
        return Response({'Message': 'User logged out successfully'})
    
    def put(self, request):     # Update user
        # id = request.session.get('id')
        user = MyUser.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        id = request.data.get(id)
        admin = MyUser.objects.get(id=id)
        get = UserSerializer(admin, data=request.data, partial=True)
        if (serializer.is_valid()) and (not user.is_staff):
            serializer.save()
            return Response(serializer.data)
        elif (get.is_valid()) and (user.is_staff):
            get.save()
            return Response({'Message': 'User Update successfully  ', "Users Data":serializer.data })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):      # Delet user
        id = self.request.session.get('id')
        user = MyUser.objects.get(id=id)
        id = request.data.get("id")
        print(id)
        admin = MyUser.objects.get(id=id)
        if (not user.is_staff):
            user.delete()
            logout(request)
            return Response({'Message': 'Your account deleted successfully'})
        elif (user.is_staff):
            admin.delete()
            return Response({'Message': 'your account that you are choosed deleted successfully'})



class CreateProductView(TokenObtainPairView):
    serializer_class = ProductSerializer

    def post(self, request,Year, Make, Model, Trim, price, id):
        # login_view = Login()
        # login_response = login_view.post(request)
        # token = None  # Default value for token
        # verification_key = '1999'
        # id = None  # Default value for id

        # if 'jwt_token' in login_response.data:
        #     token = login_response.data['jwt_token']

        # try:
        #     decoded_token = jwt.decode(token, verification_key, algorithms=["HS256"])
        #     # Token verification succeeded
        #     id = decoded_token.get("id")  # Use "user_id" instead of "id"
        # except jwt.ExpiredSignatureError:
        #     print("Token has expired")
        # except jwt.InvalidTokenError:
        #     print("Token verification failed")
        print(id)
        if id is not None:
            Year = request.data.get('Year')
            Make = request.data.get('Make')
            Model = request.data.get('Model')
            Trim = request.data.get('Trim')
            price = request.data.get('price')
            UserID = MyUser.objects.get(id=id)
            if not price:
                return Response({'Message': 'Price is required'})
            product = Product(Year=Year, Make=Make, Model=Model, Trim=Trim, price=price, UserID=UserID)
            product.save()
            return Response({'Message': 'You have created the product'})
        else:
            return Response({'Message': 'Login before you create a product'})



class GetProducts(TokenObtainPairView):
    serializer_class = ProductSerializer

    def post(self, request):
        name = request.data.get('name')
        UserID = MyUser.objects.get(username=name)
        produit = Product.objects.filter(UserID = UserID)
        serializer = ProductSerializer(produit, many=True)
        return Response({ "Products of Mr. "+name:  serializer.data })
    
    def get(self, request):
        produit = Product.objects.all()
        serializer = ProductSerializer(produit, many=True)
        return Response({ "All Products":serializer.data })
    
    

class ManageMyProduct(TokenObtainPairView):
    serializer_class = ProductSerializer

    def get(self, request, id):
        # id = request.session.get('id')
        if id is not None:
            user = MyUser.objects.get(id=id)
            if not user.is_staff :
                produit = Product.objects.filter(UserID = user)
                serializer = ProductSerializer(produit, many=True)
                return Response({ "Your Products":serializer.data })
            else:
                produit = Product.objects.all().values()
                serializer = ProductSerializer(produit, many=True)
                return Response({ "Your Products":serializer.data })
        else:
            return Response({'Message': 'You are not authorized to access this page'})


    def post(self, request):
        id = request.data.get('id')
        # login_view = Login()
        # login_response = login_view.post(request)
        # token = None  # Default value for token
        # verification_key = '1999'
        # id = None  # Default value for id

        # if 'jwt_token' in login_response.data:
        #     token = login_response.data['jwt_token']

        # try:
        #     decoded_token = jwt.decode(token, verification_key, algorithms=["HS256"])
        #     # Token verification succeeded
        #     id = decoded_token.get("id")  # Use "user_id" instead of "id"
        # except jwt.ExpiredSignatureError:
        #     print("Token has expired")
        # except jwt.InvalidTokenError:
        #     print("Token verification failed")
        produit = Product.objects.filter(id=id)
        serializer = ProductSerializer(produit, many=True)
        return Response({ "Product":  serializer.data })
    
    def put(self, request,id):
        # id = request.data.get('id')
        produit = Product.objects.get(id=id)
        serializer = ProductSerializer(produit, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({ 'Message': 'Product Update successfully  '})

    def delete(self, request,id):    
        # id = request.data.get('id')
        product = Product.objects.get(id=id)
        product.delete()
        return Response({'Message': 'Your Product deleted successfully'})
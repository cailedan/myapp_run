from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.response import Response
from runapp.serializers.user_serializer import UserSerializer
from django.contrib.auth.models import User

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data
            access_token = tokens['access']
            refresh_token = tokens['refresh']

            username = request.data.get('username')
            user = User.objects.get(username=username)
            serializer = UserSerializer(user, many=False)

            res = Response()

            res.data = {
                'success': True,
                'user': serializer.data
            }
            
            res.set_cookie(
                key='access_token',
                value=str(access_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            
            res.set_cookie(
                key='refresh_token',
                value=str(refresh_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.data.update(tokens)
            return res
        except Exception as e:
            print(e) 
            return Response({'error': 'Invalid credentials'}, status=400)
       
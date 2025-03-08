from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from runapp.authentication import CookiesJWTAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view,permission_classes


# class HelloWorldView(APIView):
#     permission_classes = [IsAuthenticated]
#     # authentication_classes = [CookiesJWTAuthentication]

#     def get(self, request):
#         user = request.user
#         return Response({'message': 'Hello, world!'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def helloworld(request):
    return Response({'message': 'Hello, world!'})
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from runapp.serializers.user_serializer import UserSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def authenticated_user(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)
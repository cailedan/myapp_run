from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from runapp.serializers.register_serializer import RegisterSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])  # 不使用任何认证类
def register(request):
    
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True})
    else:
        return Response({'error': serializer.errors})
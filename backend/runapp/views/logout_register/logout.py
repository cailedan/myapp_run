from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny

from rest_framework.response import Response
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response()
        res.data = {'success' : True}
        res.delete_cookie('access_token' , path='/' , samesite='None')
        res.delete_cookie('refresh_token' , path='/' , samesite='None')
        return res

    except Exception as e:
        print(e)
        return Response({'success':False})
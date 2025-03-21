# runapp/views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from runapp.serializers.user_serializer import UserSerializer

User = get_user_model()
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            # 通过 email 查找用户（注意：此处用 email，而非 username）
            user = User.objects.get(email=request.data['email'])
            serializer = UserSerializer(user, many=False)

            res = Response()
            res.data = {
                'success': True,
                'user': serializer.data,

            }

            # 设置 Cookie（保持原有逻辑）
            res.set_cookie(
                key='access_token',
                value=str(tokens['access']),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.set_cookie(
                key='refresh_token',
                value=str(tokens['refresh']),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            return res
        except User.DoesNotExist:
            return Response({'error': '用户不存在'}, status=400)
        except KeyError:
            return Response({'error': '邮箱或密码缺失'}, status=400)
        except Exception as e:
            print(f"登录错误: {str(e)}")
            return Response({'error': '登录失败'}, status=500)
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
                        # 从COOKIE或请求体中获取refresh_token（优先请求体）
            refresh_token = request.data.get('refresh') or request.COOKIES.get('refresh_token')
            if not refresh_token:
                return Response({'refreshed': False, 'detail': 'Missing refresh token'})

            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            
            tokens = response.data
            access_token = tokens['access']

            res = Response()

            res.data = {'refreshed': True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/'
            )
            return res

        except Exception as e:
            print(e)
            return Response({'refreshed': False})
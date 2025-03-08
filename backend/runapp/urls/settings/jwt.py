from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.urls import path
from runapp.views.token.get_token import CustomTokenObtainPairView
from runapp.views.token.refresh_token import CustomTokenRefreshView
urlpatterns = [
 
    # 类.as_view()将类转换为函数写法
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),

]

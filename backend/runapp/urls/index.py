from django.urls import path,include
from runapp.views.test_user.helloworld import helloworld
from runapp.views.logout_register.logout import logout
from runapp.views.logout_register.register import register


urlpatterns = [
    path('helloworld/', helloworld, name='hello_world'),
    path('jwt/', include('runapp.urls.settings.jwt')),
    path('logout/', logout, name='logout'),
    path('register/', register, name='register')
]
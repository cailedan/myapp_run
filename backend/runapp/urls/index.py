from django.urls import path,include
from runapp.views.test_user.helloworld import helloworld
from runapp.views.logout_register.logout import logout
from runapp.views.logout_register.register import register
from runapp.views.authenticated_user.authenticated_user import authenticated_user
from runapp.views.data.input_historydata import history_data_upload
from runapp.views.data.get_history_data import HistoryDataListView
urlpatterns = [
    path('helloworld/', helloworld, name='hello_world'),
    path('jwt/', include('runapp.urls.settings.jwt')),
    path('logout/', logout, name='logout'),
    path('register/', register, name='register'),
    path('authenticated_user/', authenticated_user, name='authenticated_user'),
    path('history_data_upload/', history_data_upload, name='history_data_upload'),
    path('get_history_data/' ,HistoryDataListView.as_view(),name="get_history_data" ),
]
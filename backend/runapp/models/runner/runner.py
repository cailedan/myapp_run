from django.db import models


from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()


class Runner(models.Model): # Player 类继承自 Model 类
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='runner')

    photo = models.URLField( max_length=256, blank=True)
    # 用于存储用户的头像的url

    # 指定每个player数据展示在前台的数据
    def __str__(self):
        return str(self.user)    # 展示用户的用户名

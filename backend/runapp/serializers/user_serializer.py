from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['name', 'password']

    def create(self, validated_data):
        # 使用 create_user 方法，自动哈希密码
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        # 显式处理密码更新（如果客户端提供了新密码）
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)  # 哈希新密码
        return super().update(instance, validated_data)
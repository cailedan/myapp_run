from rest_framework import serializers
from django.contrib.auth import get_user_model
from runapp.models.runner.runner import Runner
from runapp.serializers.user_serializer import UserSerializer

User = get_user_model()
class RunnerSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # 嵌套 UserSerializer
    class Meta:
        model = Runner  # 关联自定义的 Runner 模型
        fields = ['user','photo']  # 序列化字段

    def create(self, validated_data):
        user_data = validated_data.pop('user')  # 提取 user 数据
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)  # 创建 User 对象
        return Runner.objects.create(user=user, **validated_data)  # 创建 Runner 对象

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})  # 提取 user 数据（可能为空）
        user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()  # 更新 User 对象
        return super().update(instance, validated_data)  # 更新 Runner 对象
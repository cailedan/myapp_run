from rest_framework import serializers


# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ( 'username', 'password')
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(validated_data['username'], password=validated_data['password'])

#         return user
#     上下两个都行，password权限writete'nly'，表示只写，不能读，不会在返回中显示
from rest_framework import serializers
from django.contrib.auth import get_user_model
from runapp.models.runner.runner import Runner
from django.db import transaction
from django.db import IntegrityError

User = get_user_model()
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email','name', 'password', 'confirm_password')

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({'confirm_password': '两次输入的密码不一致'})
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("该邮箱已被注册")
        return data

    def create(self, validated_data):
        # 移除 confirm_password 字段，因为不需要保存到数据库
        validated_data.pop('confirm_password')
        try:
            with transaction.atomic():
                    user = User(
                            name=validated_data['name'],
                            email=validated_data['email'],
                        )
                    user.set_password(validated_data['password'])
                    user.save()
                    Runner.objects.create(user=user)
                    
            return user
        except IntegrityError as e:
            # 处理数据库完整性错误，例如唯一约束冲突
            raise serializers.ValidationError({'error': f'注册失败: {str(e)}'})
        except Exception as e:
            # 处理其他未知异常
            raise serializers.ValidationError({'error': f'发生未知错误: {str(e)}'})
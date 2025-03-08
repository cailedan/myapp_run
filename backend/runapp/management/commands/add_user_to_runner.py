from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from runapp.models.runner.runner import Runner  # 替换 your_app 为实际应用名

class Command(BaseCommand):
    help = '将现有的 User 用户添加到 Runner 表中'

    def handle(self, *args, **options):
        users = User.objects.all()
        for user in users:
            try:
                Runner.objects.create(user=user)
                self.stdout.write(self.style.SUCCESS(f"为用户 {user.username} 创建 Runner 对象成功。"))
            except Exception as e:
                self.stderr.write(self.style.ERROR(f"为用户 {user.username} 创建 Runner 对象失败: {e}"))
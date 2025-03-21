from django.db import models
from runapp.models.runner.runner import Runner

class HistoryData(models.Model):
    runner = models.ForeignKey(Runner, on_delete=models.CASCADE, related_name='history_data')
    date_key = models.CharField(max_length=20)  # 存储类似 20250324 的日期数字
    date = models.CharField(max_length=20 , null=True , blank=True)
    totalDistance = models.CharField(max_length=20)
    totalPace = models.CharField(max_length=20)
    averagePace = models.CharField(max_length=20)
    averageHeartRate = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"{self.runner.user.name} - {self.date_key}"
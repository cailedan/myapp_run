from .history_data import HistoryData
from django.db import models

class Segment(models.Model):
    history_data = models.ForeignKey(HistoryData, on_delete=models.CASCADE, related_name='segments')
    segmentNumber = models.CharField(max_length=10)
    distance = models.CharField(max_length=20)
    pace = models.CharField(max_length=20)
    heartRate = models.CharField(max_length=10)

    def __str__(self):
        return f"Segment {self.segmentNumber} for {self.history_data.runner}"
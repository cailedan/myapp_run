from rest_framework import serializers
from runapp.models.history_data.history_data import HistoryData
from runapp.models.history_data.segment import Segment

class SegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Segment
        fields = ['segmentNumber', 'distance', 'pace', 'heartRate']

class HistoryDataSerializer(serializers.ModelSerializer):
    segments = SegmentSerializer(many=True)

    class Meta:
        model = HistoryData
        fields = [
            'date',
            'totalDistance', 
            'totalPace', 
            'averagePace', 
            'averageHeartRate', 
            'segments'
        ]

    def create(self, validated_data):
        segments_data = validated_data.pop('segments')
        runner = self.context['runner']
        date_key = self.context['date_key']
        
        # 更新或创建历史数据
        history_data, _ = HistoryData.objects.update_or_create(
            runner=runner,
            date_key=date_key,
            defaults=validated_data
        )
        
        # 删除旧的分段数据
        history_data.segments.all().delete()
        
        # 创建新的分段数据
        for segment_data in segments_data:
            Segment.objects.create(history_data=history_data, **segment_data)
        
        return history_data
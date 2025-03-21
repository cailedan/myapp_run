# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from runapp.models.history_data.history_data import HistoryData
from runapp.serializers.history_data_seriliazer import HistoryDataSerializer

class HistoryDataListView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # 获取当前用户的 Runner 对象
            runner = request.user.runner
            # 查询该 Runner 的所有历史数据，并预加载关联的 Segment 对象
            history_data = HistoryData.objects.filter(runner=runner).prefetch_related('segments')
            # 对查询结果进行序列化
            serializer = HistoryDataSerializer(history_data, many=True)
            # 返回序列化后的数据
            return Response(serializer.data, status=200)
        except Exception as e:
            # 若出现异常，返回错误信息
            return Response({"error": str(e)}, status=500)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from datetime import datetime
from runapp.models.runner.runner import Runner
from runapp.serializers.history_data_seriliazer import HistoryDataSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def history_data_upload(request):
        # 获取当前用户关联的Runner
        try:
            runner = request.user.runner
            print(runner)
        except Runner.DoesNotExist:
            return Response(
                {"error": "Runner profile not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        response_errors = []
        history_data = request.data

        # 遍历每个日期键
        for date_key, submissions in history_data.items():
            if not submissions:
                continue

            # 每个日期只处理第一个提交数据（根据数据结构示例）
            submission_data = submissions[0]

            print(date_key , submission_data)
            # 准备序列化数据
            data = {
                "date": submission_data.get("date"),
                "totalDistance": submission_data.get("totalDistance"),
                "totalPace": submission_data.get("totalPace"),
                "averagePace": submission_data.get("averagePace"),
                "averageHeartRate": submission_data.get("averageHeartRate"),
                "segments": submission_data.get("segments", [])
            }

            # 创建带上下文的序列化器
            serializer = HistoryDataSerializer(
                data=data,
                context={
                    'runner': runner,
                    'date_key': date_key
                }
            )

            if serializer.is_valid():
                serializer.save()
            else:
                response_errors.append({
                    date_key: serializer.errors
                })

        if response_errors:
            return Response(
                {"errors": response_errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"message": "Data processed successfully",
             "suceess": True,
             },
            status=status.HTTP_201_CREATED
        )
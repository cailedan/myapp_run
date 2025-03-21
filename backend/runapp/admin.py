from django.contrib import admin
from runapp.models.runner.runner import Runner
from runapp.models.history_data.history_data import HistoryData
from runapp.models.history_data.segment import Segment

# Register your models here.

# 注册 Runner 模型
admin.site.register(Runner)
# 注册 HistoryData 模型
admin.site.register(HistoryData)
# 注册 Segment 模型
admin.site.register(Segment)
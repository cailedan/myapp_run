# Generated by Django 4.2.18 on 2025-03-21 00:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('runapp', '0004_rename_heart_rate_segment_heartrate_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='historydata',
            old_name='average_heart_rate',
            new_name='averageHeartRate',
        ),
        migrations.RenameField(
            model_name='historydata',
            old_name='average_pace',
            new_name='averagePace',
        ),
        migrations.RenameField(
            model_name='historydata',
            old_name='total_distance',
            new_name='totalDistance',
        ),
        migrations.RenameField(
            model_name='historydata',
            old_name='total_pace',
            new_name='totalPace',
        ),
    ]

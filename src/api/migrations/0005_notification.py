# Generated by Django 4.2.6 on 2024-05-23 14:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("register", "0001_initial"),
        ("api", "0004_blog_date_published"),
    ]

    operations = [
        migrations.CreateModel(
            name="Notification",
            fields=[
                (
                    "notification_id",
                    models.AutoField(primary_key=True, serialize=False),
                ),
                ("content", models.TextField()),
                ("is_read", models.BooleanField(default=False)),
                ("date_created", models.DateTimeField(auto_now_add=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="notifications",
                        to="register.profile",
                    ),
                ),
            ],
        ),
    ]
# Generated by Django 4.2.6 on 2024-05-27 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0006_alter_blog_markdown"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blog", name="date_published", field=models.DateTimeField(),
        ),
    ]
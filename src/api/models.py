from django.db import models

# Create your models here.
class Blog(models.Model):
    category = models.CharField(max_length=100)
    img = models.ImageField()
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    content = models.TextField()
    rank = models.FloatField()

    def __str__(self):
        return self.title
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class HC(models.Model):
    titulo = models.CharField(max_length=100)
    contenido = models.TextField()
    paciente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='historiasClinicas')

    def __str__(self):
        return self.titulo
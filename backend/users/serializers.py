from rest_framework import serializers
from django.contrib.auth.models import User
from .models import HC

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'username', 'password']
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):
		user = User.objects.create_user(**validated_data)
		return user
	
class HCSerializer(serializers.ModelSerializer):
	class Meta:
		model = HC
		fields = ['id', 'contenido', 'paciente', 'titulo']
		extra_kwargs = {'paciente': {'write_only': True}}

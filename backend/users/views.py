# Create your views here.
from rest_framework import viewsets, generics
from .serializers import UserSerializer, HCSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import HC

class HCListCreate(generics.ListCreateAPIView):
	serializer_class = HCSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return HC.objects.filter(paciente=user)
		
	def perform_create(self, serializer):
		serializer.save(paciente=self.request.user)

class HCDelete(generics.DestroyAPIView):
	serializer_class = HCSerializer
	permission_classes = [IsAuthenticated]

	def get_queryset(self):
		user = self.request.user
		return HC.objects.filter(paciente=user)


class CreatUserView(generics.CreateAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [AllowAny]

from django.urls import path
from . import views

urlpatterns = [
    path('HCs/', views.HCListCreate.as_view(), name='listar-hc'),
    path('HCs/delete/<int:pk>/', views.HCDelete.as_view(), name='borrar-hc'),
]
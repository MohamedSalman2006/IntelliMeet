from django.urls import path
from . import views

urlpatterns = [
    path('schedule/', views.suggest_slot),
    path('agenda/', views.generate_agenda),
    path('followups/', views.list_followups),
]

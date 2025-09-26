from django.urls import path
from . import views

urlpatterns = [
    path('suggest-slots/', views.suggest_meeting_slots, name='suggest-slots'),
    path('test-page/', views.meeting_test_page, name='test-page'),
]

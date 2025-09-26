from django.urls import path
from . import views

urlpatterns = [
    path('suggest-slots/', views.suggest_meeting_slots, name='suggest-slots'),
    path('test-page/', views.meeting_test_page, name='test-page'),
    path('summarize/', views.summarize_meeting, name='summarize-meeting'),
    path('summarize-test-page/', views.summarize_test_page, name='summarize-test-page'),
]

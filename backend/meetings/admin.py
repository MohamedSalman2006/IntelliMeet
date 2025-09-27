from django.contrib import admin
from .models import ActionItem, Participant, AvailabilitySlot

admin.site.register(ActionItem)
admin.site.register(Participant)
admin.site.register(AvailabilitySlot)
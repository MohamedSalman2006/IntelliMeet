from django.db import models

class ActionItem(models.Model):
    description = models.TextField()
    assignee = models.CharField(max_length=100)
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description[:50]

class Participant(models.Model):
    name = models.CharField(max_length=200) 
    timezone = models.CharField(max_length=100) 

    def __str__(self):
        return self.name

class AvailabilitySlot(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, related_name='slots')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return f"{self.participant.name}: {self.start_time.isoformat()} to {self.end_time.isoformat()}"
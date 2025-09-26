from django.db import models

class ActionItem(models.Model):
    description = models.TextField()
    assignee = models.CharField(max_length=100)
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description[:50]
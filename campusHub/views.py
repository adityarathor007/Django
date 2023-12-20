from django.shortcuts import render
from .models import *

from django.core.paginator import Paginator

from django.db.models import Q
# Create your views here.

def get_students(request):
    queryset=Student.objects.all()

    if request.GET.get('search'):
        search=request.GET.get('search')
        # queryset=queryset.filter(student_name__icontains=search)    #search functionality for student_name
        # for adding search functionlaity for all fields
        queryset=queryset.filter(
        Q(student_name__icontains=search)|
        Q(department__department__icontains=search)|
        Q(student_id__student_id__icontains=search)|
        Q(student_age__icontains=search)|
        Q(student_email__icontains=search)
        )

    # adding paginator
    paginator=Paginator(queryset,25)

    pg_number=request.GET.get('page',1)
    pg_obj=paginator.get_page(pg_number)
    print(pg_obj)
    return render(request,'reportCard/student.html',{'queryset':pg_obj})

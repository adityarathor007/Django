from django.shortcuts import render
from .models import *

from django.core.paginator import Paginator

from django.db.models import Q,Sum
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

from .seed import generate_report_card

def see_marks(request,student_id):
    # generate_report_card()  to call the function to generate report card 
    queryset=SubjectMarks.objects.filter(student__student_id__student_id=student_id)
    total_marks=queryset.aggregate(total_marks=Sum('marks'))
    # current_rank=-1
    # i=1
    # ranks=Student.objects.annotate(marks=Sum('studentmarks__marks')).order_by('-marks','-student_age') #for generating ranks first marks then if same marks then person with more age will be given more priority
    # for rank in ranks:
    #     if student_id==rank.student_id.student_id:
    #         current_rank=i
    #         break
    #     i+=1

    # this method is not optimised as it search for all ranks while a link of id is clicked 

    return render(request,'reportCard/see_marks.html',{'queryset':queryset,'tm':total_marks})

from faker import Faker
import random
from .models import *
from django.db.models import Sum
fake=Faker()

def create_subject_marks():
    try: 
        # for each student it will generate marks in all subjects
        student_objs=Student.objects.all()
        for student in student_objs:
            subjects=Subject.objects.all()
            for subject in subjects:
                SubjectMarks.objects.create(
                    subject=subject,
                    student=student,
                    marks=random.randint(0,100)
                )

    except Exception as e:
        print(e)


def seed_db(n=43) -> None:
    try:
        for _ in range(n):
            [1,2,3,4]
            department_objs= Department.objects.all()
            random_index=random.randint(0,len(department_objs)-1)

            department=department_objs[random_index]
            s_id=f'STU-0{random.randint(100,999)}'
            s_name=fake.name()
            s_email=fake.email()
            s_age=random.randint(20,30)
            s_address=fake.address()

            student_id_obj=StudentID.objects.create(student_id = s_id)

            student_obj=Student.objects.create(
                department=department,
                student_id=student_id_obj,
                student_name=s_name,
                student_email=s_email,
                student_age=s_age,
                student_address=s_address,
            )
    except Exception as e:
        print(e)
            
def generate_report_card():
    i=1
    ranks=Student.objects.annotate(marks=Sum('studentmarks__marks')).order_by('-marks','-student_age') #for generating ranks first marks then if same marks then person with more age will be given more priority
    for rank in ranks:
        ReportCard.objects.create(
            student=rank,  #rank is the object of student
            student_rank=i
        )
        i+=1
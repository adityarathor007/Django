# since uses resources of django (eg:home.models) so it can be run directly it has to done in the shell


from home.models import Student
import time

def run_this_function():
    print("Function Started")
    time.sleep(2)
    print("Function Executed")
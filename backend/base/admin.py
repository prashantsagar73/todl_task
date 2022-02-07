from unicodedata import category
from urllib import response
from django.contrib import admin

# Register your models here.


from .models import *

admin.site.register((Note, Survey,Category, Question,Response,AnswerBase))
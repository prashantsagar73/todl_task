from rest_framework.serializers import ModelSerializer
from base.models import Note, Survey,Category, Question,Response,AnswerBase


class NoteSerializer(ModelSerializer):
  class Meta:
    model = Note
    fields = '__all__'

class SurveySerializer(ModelSerializer):
  class Meta:
    model = Survey
    fields = '__all__'

class CategorySerializer(ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'

class QuestionSerializer(ModelSerializer):
  class Meta:
    model = Question
    fields = '__all__'

class ResponseSerializer(ModelSerializer):
  class Meta:
    model = Response
    fields = '__all__'

class AnswerBaseSerializer(ModelSerializer):
  class Meta:
    model = AnswerBase
    fields = '__all__'



from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Song
from .models import Todo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ["id", "title", "url", "image", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id", "title", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
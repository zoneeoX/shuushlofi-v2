from django.urls import path
from . import views

urlpatterns = [
    path("song/", views.SongListCreate.as_view(), name="song-list"),
    path("song/delete/<int:pk>/", views.SongDelete.as_view(), name="delete-song"),
    path("song/update/<int:pk>/", views.SongUpdate.as_view(), name="update-song"),
    path("todo/", views.TodoListCreate.as_view(), name="todo-list"),
    path("todo/delete/<int:pk>/", views.TodoDelete.as_view(), name="delete-todo"),
    path("todo/update/<int:pk>/", views.TodoUpdate.as_view(), name="update-todo"),
]
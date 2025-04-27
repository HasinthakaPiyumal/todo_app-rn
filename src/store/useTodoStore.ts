import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Todo} from '../types/todo';

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  addTodo: (title: string, description: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    set => ({
      todos: [],
      isLoading: false,

      addTodo: (title: string, description: string) => {
        if (title.trim() === '') return;

        set(state => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              title,
              description,
              completed: false,
              createdAt: new Date(),
            },
          ],
        }));
      },

      toggleTodo: (id: string) => {
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo,
          ),
        }));
      },

      deleteTodo: (id: string) => {
        set(state => ({
          todos: state.todos.filter(todo => todo.id !== id),
        }));
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        if (state) state.isLoading = false;
      },
    },
  ),
);

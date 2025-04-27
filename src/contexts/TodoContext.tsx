import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Todo } from '../types/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TodoContextType {
    todos: Todo[];
    addTodo: (title: string, description: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    isLoading: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load todos from storage on app start
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const storedTodos = await AsyncStorage.getItem('todos');
                if (storedTodos) {
                    const parsedTodos = JSON.parse(storedTodos);
                    // Convert string dates back to Date objects
                    const formattedTodos = parsedTodos.map((todo: any) => ({
                        ...todo,
                        createdAt: new Date(todo.createdAt)
                    }));
                    setTodos(formattedTodos);
                }
            } catch (error) {
                console.error('Failed to load todos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTodos();
    }, []);

    // Save todos to storage whenever they change
    useEffect(() => {
        const saveTodos = async () => {
            try {
                await AsyncStorage.setItem('todos', JSON.stringify(todos));
            } catch (error) {
                console.error('Failed to save todos:', error);
            }
        };

        if (!isLoading) {
            saveTodos();
        }
    }, [todos, isLoading]);

    const addTodo = (title: string, description: string) => {
        if (title.trim() === '') return;

        const newTodo: Todo = {
            id: Date.now().toString(),
            title,
            description: description.trim() || undefined,
            completed: false,
            createdAt: new Date()
        };

        setTodos(prevTodos => [...prevTodos, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, isLoading }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};
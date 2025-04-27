import React from 'react';
import { FlatList } from 'react-native';
import { Todo } from '../../types/todo';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

interface TodoListProps {
    todos: Todo[];
    onToggleTodo: (id: string) => void;
    onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    onToggleTodo,
    onDeleteTodo
}) => {
    return (
        <FlatList
            data={todos}
            renderItem={({ item }) => (
                <TodoItem
                    todo={item}
                    onToggle={onToggleTodo}
                    onDelete={onDeleteTodo}
                />
            )}
            keyExtractor={item => item.id}
            className="w-full"
            contentContainerClassName="pb-4"
            ListEmptyComponent={<EmptyState />}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default TodoList;
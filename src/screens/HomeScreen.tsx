import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTodo } from '../contexts/TodoContext';
import TodoHeader from '../components/todo/TodoHeader';
import TodoList from '../components/todo/TodoList';
import AddTodoModal from '../components/todo/AddTodoModal';

const HomeScreen: React.FC = () => {
    const { todos, addTodo, toggleTodo, deleteTodo, isLoading } = useTodo();
    const [modalVisible, setModalVisible] = useState(false);

    const completedTasks = todos.filter(todo => todo.completed).length;

    const handleAddTodo = (title: string, description: string) => {
        addTodo(title, description);
        setModalVisible(false);
    };

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-dark-300">
                <ActivityIndicator size="large" color="#d6bcfa" /* purple-200 */ />
            </View>
        );
    }

    return (

        <SafeAreaView className="flex-1 bg-dark-300 py-12">
            <View className="flex-1 px-4">
                <TodoHeader totalTasks={todos.length} completedTasks={completedTasks} />

                <TodoList
                    todos={todos}
                    onToggleTodo={toggleTodo}
                    onDeleteTodo={deleteTodo}
                />

                <TouchableOpacity
                    className="absolute right-5 bottom-5 bg-primary-500 w-14 h-14 rounded-full justify-center items-center shadow-lg"
                    onPress={() => setModalVisible(true)}
                >
                    <Ionicons name="add" size={28} color="white" />
                </TouchableOpacity>

                <AddTodoModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onAddTodo={handleAddTodo}
                />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
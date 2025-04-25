import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';

// Task interface
interface Task {
    id: string;
    title: string;
    completed: boolean;
}

const HomeScreen = () => {
    // State for tasks and input
    const [tasks, setTasks] = useState<Task[]>([
        { id: '1', title: 'Complete project proposal', completed: false },
        { id: '2', title: 'Buy groceries', completed: true },
        { id: '3', title: 'Schedule meeting with team', completed: false },
    ]);
    const [newTask, setNewTask] = useState('');

    // Animation values
    const addButtonScale = useSharedValue(1);

    // Add a new task
    const handleAddTask = () => {
        if (newTask.trim() === '') return;

        const task = {
            id: Date.now().toString(),
            title: newTask,
            completed: false,
        };

        setTasks([...tasks, task]);
        setNewTask('');
    };

    // Toggle task completion
    const toggleTaskCompletion = (id: string) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Delete a task
    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Button animation style
    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: addButtonScale.value }],
        };
    });

    // Button press animation
    const handlePressIn = () => {
        addButtonScale.value = withSpring(0.9);
    };

    const handlePressOut = () => {
        addButtonScale.value = withSpring(1);
    };

    // Render right actions for swipe
    const renderRightActions = (taskId: string) => {
        return (
            <TouchableOpacity
                className="bg-red-500 w-20 justify-center items-center rounded-r-xl"
                onPress={() => deleteTask(taskId)}
            >
                <Text className="text-white font-bold">Delete</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

            <View className="px-6 pt-4 pb-2">
                <Text className="text-3xl font-bold text-gray-800">My Tasks</Text>
                <Text className="text-gray-500 mt-1">
                    {tasks.filter(task => !task.completed).length} tasks pending
                </Text>
            </View>

            {/* Task Input */}
            <View className="px-6 py-4 flex-row">
                <TextInput
                    className="flex-1 bg-white border border-gray-200 rounded-l-xl px-4 py-3 text-gray-700"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChangeText={setNewTask}
                />
                <Animated.View style={buttonAnimatedStyle}>
                    <TouchableOpacity
                        className="bg-indigo-600 rounded-r-xl px-5 py-3 justify-center items-center"
                        onPress={handleAddTask}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                    >
                        <Text className="text-white font-bold">Add</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            {/* Task Categories */}
            <View className="flex-row px-6 pb-4">
                <TouchableOpacity className="bg-indigo-100 px-4 py-2 rounded-full mr-2">
                    <Text className="text-indigo-800 font-medium">All</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full mr-2">
                    <Text className="text-gray-800 font-medium">Work</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-full">
                    <Text className="text-gray-800 font-medium">Personal</Text>
                </TouchableOpacity>
            </View>

            {/* Tasks List */}
            {/* <ScrollView className="flex-1">
                <View className="px-6 pb-24">
                    {tasks.length === 0 ? (
                        <View className="items-center justify-center py-16">
                            <Text className="text-gray-400 text-lg">No tasks yet</Text>
                            <Text className="text-gray-400">Add a task to get started</Text>
                        </View>
                    ) : (
                        tasks.map(task => (
                            <Swipeable
                                key={task.id}
                                renderRightActions={() => renderRightActions(task.id)}
                            >
                                <TouchableOpacity
                                    className={`flex-row items-center mb-3 p-4 rounded-xl ${task.completed ? 'bg-gray-100' : 'bg-white'
                                        } border border-gray-200 shadow-sm`}
                                    onPress={() => toggleTaskCompletion(task.id)}
                                    activeOpacity={0.8}
                                >
                                    <View
                                        className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${task.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'
                                            }`}
                                    >
                                        {task.completed && (
                                            <Text className="text-white text-xs">✓</Text>
                                        )}
                                    </View>

                                    <Text
                                        className={`flex-1 text-base ${task.completed
                                            ? 'text-gray-500 line-through'
                                            : 'text-gray-800'
                                            }`}
                                    >
                                        {task.title}
                                    </Text>
                                </TouchableOpacity>
                            </Swipeable>
                        ))
                    )}
                </View>
            </ScrollView> */}

            {/* Floating Action Button */}
            <View className="absolute bottom-6 right-6">
                <Animated.View style={buttonAnimatedStyle}>
                    <TouchableOpacity
                        className="bg-indigo-600 w-14 h-14 rounded-full items-center justify-center shadow-lg"
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                    >
                        <Text className="text-white text-2xl font-light">+</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            {/* Only on iOS, avoid keyboard */}
            {Platform.OS === 'ios' && <KeyboardAvoidingView behavior="padding" />}
        </SafeAreaView>
    );
};

export default HomeScreen;
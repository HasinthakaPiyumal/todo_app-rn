import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Todo } from '../../types/todo';
import ConfirmationDialog from '../common/ConfirmationDialog';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDeletePress = () => {
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        onDelete(todo.id);
        setShowDeleteDialog(false);
    };

    return (
        <View className="bg-dark-200 p-4 rounded-xl mb-3 shadow-sm">
            <View className="flex-row justify-between items-start">
                <View className="flex-row items-start flex-1">
                    <TouchableOpacity
                        className="mt-1 mr-3"
                        onPress={() => onToggle(todo.id)}
                    >
                        {todo.completed ? (
                            <Ionicons name="checkmark-circle" size={22} color="#d6bcfa" /* purple-200 */ />
                        ) : (
                            <Ionicons name="ellipse-outline" size={22} color="#9ca3af" /* gray-400 */ />
                        )}
                    </TouchableOpacity>

                    <View className="flex-1">
                        <Text
                            className={`text-base font-semibold ${todo.completed ? 'text-gray-400 line-through' : 'text-white'}`}
                        >
                            {todo.title}
                        </Text>

                        {todo.description && (
                            <Text
                                className={`text-sm mt-1 ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}
                                numberOfLines={2}
                            >
                                {todo.description}
                            </Text>
                        )}
                    </View>
                </View>

                <TouchableOpacity
                    className="ml-2 p-1"
                    onPress={handleDeletePress}
                >
                    <Ionicons name="trash-outline" size={20} color="#ef4444" /* red-500 */ />
                </TouchableOpacity>
            </View>

            <ConfirmationDialog
                visible={showDeleteDialog}
                title="Delete Task"
                message={`Are you sure you want to delete "${todo.title}"?`}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowDeleteDialog(false)}
                isDangerous={true}
            />
        </View>
    );
};

export default TodoItem;
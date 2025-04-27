import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { classNames } from '../../utils/tailwind';

interface AddTodoModalProps {
    visible: boolean;
    onClose: () => void;
    onAddTodo: (title: string, description: string) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ visible, onClose, onAddTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (title.trim() === '') return;
        onAddTodo(title, description);
        setTitle('');
        setDescription('');
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1 justify-center items-center bg-black/50"
                >
                    <View className="w-[90%] bg-dark-200 rounded-2xl p-5 shadow-lg">
                        <View className="flex-row justify-between items-center mb-5">
                            <Text className="text-xl font-bold text-white">Add New Task</Text>
                            <TouchableOpacity onPress={handleCancel}>
                                <Text><Ionicons name="close" size={24} color="#d6bcfa" /> </Text>
                            </TouchableOpacity>
                        </View>

                        <View className="mb-4">
                            <Text className="text-base font-semibold text-purple-200 mb-2">Title</Text>
                            <TextInput
                                className="border border-dark-100 bg-dark-300 rounded-lg p-3 text-base text-white"
                                placeholder="Enter task title"
                                placeholderTextColor="#6b7280" /* gray-500 */
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-base font-semibold text-purple-200 mb-2">Description</Text>
                            <TextInput
                                className="border border-dark-100 bg-dark-300 rounded-lg p-3 text-base min-h-[100px] text-white"
                                placeholder="Enter task description (optional)"
                                placeholderTextColor="#6b7280" /* gray-500 */
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                textAlignVertical="top"
                            />
                        </View>

                        <View className="flex-row justify-between mt-5">
                            <TouchableOpacity
                                className="bg-dark-100 rounded-lg py-3 px-4 w-[48%] items-center"
                                onPress={handleCancel}
                            >
                                <Text className="text-white font-semibold">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={classNames(
                                    "rounded-lg py-3 px-4 w-[48%] items-center",
                                    title.trim() === '' ? "bg-primary-300" : "bg-primary-500"
                                )}
                                onPress={handleSubmit}
                                disabled={title.trim() === ''}
                            >
                                <Text className="text-white font-bold">Add Task</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default AddTodoModal;
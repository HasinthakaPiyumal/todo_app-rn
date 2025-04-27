import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { classNames } from '../../utils/tailwind';

interface ConfirmationDialogProps {
    visible: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDangerous?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    visible,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    isDangerous = false,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <TouchableWithoutFeedback>
                        <View className="w-4/5 bg-dark-200 rounded-2xl p-6 items-center shadow-md">
                            <View className="mb-4">
                                <View className={classNames(
                                    "w-15 h-15 rounded-full justify-center items-center",
                                    isDangerous ? "bg-red-500" : "bg-primary-500"
                                )}>
                                    <Ionicons
                                        name={isDangerous ? "alert-outline" : "help-outline"}
                                        size={30}
                                        color="white"
                                    />
                                </View>
                            </View>

                            <Text className="text-lg font-bold text-white mb-3 text-center">{title}</Text>
                            <Text className="text-base text-gray-300 mb-6 text-center">{message}</Text>

                            <View className="flex-row justify-between w-full">
                                <TouchableOpacity
                                    className="bg-dark-100 rounded-lg py-3 px-4 w-[48%] items-center"
                                    onPress={onCancel}
                                >
                                    <Text className="text-gray-300 font-semibold">{cancelText}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className={classNames(
                                        "rounded-lg py-3 px-4 w-[48%] items-center",
                                        isDangerous ? "bg-red-500" : "bg-primary-500"
                                    )}
                                    onPress={onConfirm}
                                >
                                    <Text className="text-white font-bold">{confirmText}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ConfirmationDialog;
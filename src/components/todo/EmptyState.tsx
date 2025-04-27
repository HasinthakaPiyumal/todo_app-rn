import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EmptyState: React.FC = () => {
    return (
        <View className="flex-1 justify-center items-center py-10 h-[75vh]">
            <Ionicons name="list" size={60} color="#6b7280" />
            <Text className="text-gray-400 text-lg mt-4 font-medium text-center">
                Your task list is empty
            </Text>
            <Text className="text-gray-500 text-base mt-2 text-center max-w-[250px]">
                Add your first task by tapping the + button below
            </Text>
        </View>
    );
};

export default EmptyState;
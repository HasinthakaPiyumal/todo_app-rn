import React from 'react';
import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import iconSvg from '../../assets/images/icon.js';

interface TodoHeaderProps {
    totalTasks: number;
    completedTasks: number;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ totalTasks, completedTasks }) => {
    return (
        <View className="mt-4 mb-6">
            <View className="">
                <SvgXml xml={iconSvg} height={40} />
            </View>
            <View className="flex-row">
                <Text className="text-gray-400">
                    {completedTasks} of {totalTasks} tasks completed
                </Text>
            </View>
        </View>
    );
};

export default TodoHeader;
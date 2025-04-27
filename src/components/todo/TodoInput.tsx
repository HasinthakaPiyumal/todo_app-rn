import React, { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface TodoInputProps {
    onAddTodo: (title: string, description: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTodo = () => {
        if (title.trim() === '') return;
        onAddTodo(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <View style={styles.inputContainer}>
            <View style={styles.textInputs}>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Task title..."
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.descriptionInput}
                    placeholder="Description (optional)"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: Platform.OS === 'ios' ? 30 : 10,
        alignItems: 'flex-end',
    },
    textInputs: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    titleInput: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 8,
    },
    descriptionInput: {
        fontSize: 14,
        paddingVertical: 6,
        color: '#555',
    },
    addButton: {
        width: 50,
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});

export default TodoInput;
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', type: 'ai', text: 'Hello! I\'m Vedai. How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(null);
  const flatListRef = useRef(null);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText('');
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'user',
      text: userMessage
    }]);

    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.post(`${API_URL}/chat`, {
        message: userMessage,
        userId
      });

      if (response.data.success) {
        const aiMessage = response.data.response;
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          text: aiMessage
        }]);

        // Text to Speech
        await speakText(aiMessage);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const speakText = async (text) => {
    try {
      setIsSpeaking(true);
      await Speech.speak(text, {
        language: 'en',
        rate: 1.0,
        onDone: () => setIsSpeaking(false)
      });
    } catch (error) {
      console.error('Speech error:', error);
      setIsSpeaking(false);
    }
  };

  const startListening = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Microphone permission is required');
        return;
      }

      setIsListening(true);
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
    } catch (error) {
      Alert.alert('Error', error.message);
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      // In production, send audio to backend for transcription
      Alert.alert('Voice feature', 'Speech-to-text coming soon!');
      setRecording(null);
      setIsListening(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤖 Vedai Chat</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageRow, item.type === 'user' && styles.userRow]}>
            <View style={[
              styles.messageBubble,
              item.type === 'user' && styles.userBubble
            ]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          editable={!loading}
          multiline
        />
        <TouchableOpacity
          style={[styles.voiceButton, isListening && styles.listening]}
          onPress={isListening ? stopListening : startListening}
        >
          <Text style={styles.voiceButtonText}>{isListening ? '⏹' : '🎤'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendButton, (loading || !inputText.trim()) && styles.disabled]}
          onPress={handleSendMessage}
          disabled={loading || !inputText.trim()}
        >
          <Text style={styles.sendButtonText}>{loading ? '...' : '➤'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e'
  },
  header: {
    backgroundColor: '#0f3460',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  logoutButton: {
    color: '#e94560',
    fontWeight: '600'
  },
  messagesList: {
    padding: 15,
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  messageRow: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  userRow: {
    justifyContent: 'flex-end'
  },
  messageBubble: {
    backgroundColor: '#0f3460',
    padding: 12,
    borderRadius: 15,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: 'rgba(233, 69, 96, 0.3)'
  },
  userBubble: {
    backgroundColor: '#e94560',
    borderWidth: 0
  },
  messageText: {
    color: '#fff',
    fontSize: 14
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
    backgroundColor: '#0f3460',
    borderTopWidth: 1,
    borderTopColor: 'rgba(233, 69, 96, 0.2)',
    paddingBottom: Platform.OS === 'ios' ? 30 : 15
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(233, 69, 96, 0.3)',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    maxHeight: 100
  },
  voiceButton: {
    backgroundColor: 'rgba(100, 150, 200, 0.3)',
    borderWidth: 1,
    borderColor: '#6496C8',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listening: {
    backgroundColor: 'rgba(233, 69, 96, 0.3)',
    borderColor: '#e94560'
  },
  voiceButtonText: {
    fontSize: 20
  },
  sendButton: {
    backgroundColor: '#e94560',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonText: {
    fontSize: 18,
    color: '#fff'
  },
  disabled: {
    opacity: 0.5
  }
});

export default ChatScreen;

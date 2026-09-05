import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤖 Welcome to Vedai</Text>
        <Text style={styles.subtitle}>AI Assistant with 3D Avatar</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>💬</Text>
          <Text style={styles.featureTitle}>Chat with AI</Text>
          <Text style={styles.featureDescription}>Have intelligent conversations with multiple AI models</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🎤</Text>
          <Text style={styles.featureTitle}>Voice Features</Text>
          <Text style={styles.featureDescription}>Use text-to-speech and speech-to-text capabilities</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>🤖</Text>
          <Text style={styles.featureTitle}>3D Avatar</Text>
          <Text style={styles.featureDescription}>Interact with an animated 3D avatar (web only)</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>⚙️</Text>
          <Text style={styles.featureTitle}>Model Selection</Text>
          <Text style={styles.featureDescription}>Choose between GPT-3.5, GPT-4, and Gemini Pro</Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('Chat')}
      >
        <Text style={styles.startButtonText}>Start Chatting 🚀</Text>
      </TouchableOpacity>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#b0b0b0'
  },
  content: {
    flex: 1,
    padding: 15
  },
  featureCard: {
    backgroundColor: 'rgba(15, 52, 96, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(233, 69, 96, 0.2)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center'
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8
  },
  featureDescription: {
    fontSize: 13,
    color: '#b0b0b0',
    textAlign: 'center'
  },
  startButton: {
    backgroundColor: '#e94560',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default HomeScreen;

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin đăng nhập');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Giả lập đăng nhập thành công
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Chuyển hướng dựa trên vai trò người dùng
      if (email.includes('admin')) {
        router.replace('/admin');
      } else if (email.includes('union')) {
        router.replace('/union_worker');
      } else {
        router.replace('/student');
      }
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText style={styles.appName}>Edu Attendance</ThemedText>
        </ThemedView>

        <ThemedView style={styles.formContainer}>
          <ThemedText style={styles.title}>Đăng nhập</ThemedText>
          <ThemedText style={styles.subtitle}>Vui lòng đăng nhập để tiếp tục</ThemedText>

          {error ? (
            <ThemedView style={styles.errorContainer}>
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            </ThemedView>
          ) : null}

          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Email</ThemedText>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Nhập email của bạn"
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.inputLabel}>Mật khẩu</ThemedText>
            <TextInput
              style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Nhập mật khẩu của bạn"
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </ThemedView>

          <TouchableOpacity style={styles.forgotPassword}>
            <ThemedText style={styles.forgotPasswordText}>Quên mật khẩu?</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <ThemedText style={styles.loginButtonText}>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </ThemedText>
          </TouchableOpacity>

          <ThemedView style={styles.helpSection}>
            <ThemedText style={styles.helpText}>
              Tài khoản demo:
            </ThemedText>
            <ThemedText style={styles.helpText}>
              - Sinh viên: student@example.com / password
            </ThemedText>
            <ThemedText style={styles.helpText}>
              - Cán bộ đoàn: union@example.com / password
            </ThemedText>
            <ThemedText style={styles.helpText}>
              - Quản trị viên: admin@example.com / password
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    opacity: 0.7,
  },
  errorContainer: {
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#0a7ea4',
  },
  loginButton: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  helpSection: {
    marginTop: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  helpText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
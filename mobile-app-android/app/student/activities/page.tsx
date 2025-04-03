import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StudentActivitiesScreen() {
  const colorScheme = useColorScheme();

  const menuItems = [
    {
      id: 'registered',
      title: 'Hoạt động đã đăng ký',
      description: 'Xem danh sách các hoạt động bạn đã đăng ký tham gia',
      icon: 'checkmark.circle',
      route: '/student/registered',
      color: '#4CAF50',
    },
    {
      id: 'upcoming',
      title: 'Hoạt động sắp tới',
      description: 'Khám phá các hoạt động sắp diễn ra và đăng ký tham gia',
      icon: 'calendar',
      route: '/activities',
      color: '#FF9800',
    },
    {
      id: 'history',
      title: 'Lịch sử hoạt động',
      description: 'Xem lại các hoạt động bạn đã tham gia và điểm đã tích lũy',
      icon: 'clock',
      route: '/student/history',
      color: '#2196F3',
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Quản lý hoạt động</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <ThemedView style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <IconSymbol name={item.icon} size={24} color="white" />
            </ThemedView>
            <ThemedView style={styles.menuItemContent}>
              <ThemedText style={styles.menuItemTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.menuItemDescription}>{item.description}</ThemedText>
            </ThemedView>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
});
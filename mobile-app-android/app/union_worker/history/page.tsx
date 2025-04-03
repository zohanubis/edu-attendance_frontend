import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Giả lập dữ liệu lịch sử điểm danh
const MOCK_HISTORY = [
  {
    id: '1',
    title: 'Hội thảo Khoa học Công nghệ',
    date: '15/10/2023',
    time: '08:00 - 17:00',
    location: 'Hội trường A1',
    totalRegistered: 45,
    totalAttended: 32,
    status: 'Đã hoàn thành',
  },
  {
    id: '2',
    title: 'Cuộc thi Ý tưởng Sáng tạo',
    date: '20/10/2023',
    time: '13:30 - 17:00',
    location: 'Khu vực B2',
    totalRegistered: 30,
    totalAttended: 25,
    status: 'Đã hoàn thành',
  },
  {
    id: '7',
    title: 'Hội thảo Khởi nghiệp',
    date: '25/09/2023',
    time: '09:00 - 12:00',
    location: 'Hội trường C2',
    totalRegistered: 50,
    totalAttended: 42,
    status: 'Đã hoàn thành',
  },
  {
    id: '8',
    title: 'Ngày hội Thể thao',
    date: '10/09/2023',
    time: '07:30 - 17:00',
    location: 'Sân vận động trường',
    totalRegistered: 120,
    totalAttended: 98,
    status: 'Đã hoàn thành',
  },
];

export default function UnionWorkerHistoryScreen() {
  const colorScheme = useColorScheme();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = () => {
    // Giả lập tải dữ liệu từ API
    setTimeout(() => {
      setHistory(MOCK_HISTORY);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadHistory();
  };

  const renderHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyCard}
      onPress={() => router.push(`/activities/${item.id}`)}
    >
      <ThemedView style={styles.cardHeader}>
        <ThemedText style={styles.historyTitle}>{item.title}</ThemedText>
        <ThemedView style={styles.statusBadge}>
          <ThemedText style={styles.statusText}>{item.status}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.cardContent}>
        <ThemedView style={styles.infoRow}>
          <IconSymbol name="calendar" size={16} color={Colors[colorScheme ?? 'light'].icon} />
          <ThemedText style={styles.infoText}>{item.date}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
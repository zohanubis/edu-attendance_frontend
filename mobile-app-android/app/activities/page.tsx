import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Giả lập dữ liệu hoạt động
const MOCK_ACTIVITIES = [
  {
    id: '1',
    title: 'Hội thảo Khoa học Công nghệ',
    date: '15/10/2023',
    time: '08:00 - 17:00',
    location: 'Hội trường A1',
    status: 'Đang diễn ra',
    points: 10,
  },
  {
    id: '2',
    title: 'Cuộc thi Ý tưởng Sáng tạo',
    date: '20/10/2023',
    time: '13:30 - 17:00',
    location: 'Khu vực B2',
    status: 'Sắp diễn ra',
    points: 15,
  },
  {
    id: '3',
    title: 'Ngày hội Việc làm',
    date: '05/11/2023',
    time: '08:30 - 16:30',
    location: 'Sân vận động trường',
    status: 'Sắp diễn ra',
    points: 8,
  },
  {
    id: '4',
    title: 'Hiến máu nhân đạo',
    date: '10/11/2023',
    time: '07:30 - 11:30',
    location: 'Phòng Y tế',
    status: 'Sắp diễn ra',
    points: 20,
  },
  {
    id: '5',
    title: 'Hội thảo Kỹ năng mềm',
    date: '18/11/2023',
    time: '14:00 - 17:00',
    location: 'Hội trường B3',
    status: 'Sắp diễn ra',
    points: 5,
  },
];

export default function ActivitiesScreen() {
  const colorScheme = useColorScheme();
  const [activities, setActivities] = useState<typeof MOCK_ACTIVITIES>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadActivities = () => {
    // Giả lập tải dữ liệu từ API
    setTimeout(() => {
      setActivities(MOCK_ACTIVITIES);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadActivities();
  };

  const renderActivityItem = ({ item }: { item: typeof MOCK_ACTIVITIES[0] }) => (
    <TouchableOpacity
      style={styles.activityCard}
      onPress={() => router.push(`/activities/${item.id}`)}
    >
      <ThemedView style={styles.cardHeader}>
        <ThemedText style={styles.activityTitle}>{item.title}</ThemedText>
        <ThemedView 
          style={[styles.statusBadge, { 
            backgroundColor: item.status === 'Đang diễn ra' ? '#4CAF50' : '#FF9800' 
          }]}
        >
          <ThemedText style={styles.statusText}>{item.status}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.cardContent}>
        <ThemedView style={styles.infoRow}>
          <IconSymbol name="calendar" size={16} color={Colors[colorScheme ?? 'light'].icon} />
          <ThemedText style={styles.infoText}>{item.date}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <IconSymbol name="clock" size={16} color={Colors[colorScheme ?? 'light'].icon} />
          <ThemedText style={styles.infoText}>{item.time}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <IconSymbol name="mappin" size={16} color={Colors[colorScheme ?? 'light'].icon} />
          <ThemedText style={styles.infoText}>{item.location}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.pointsContainer}>
          <IconSymbol name="star" size={16} color="#FFC107" />
          <ThemedText style={styles.pointsText}>{item.points} điểm</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
        <ThemedText style={styles.loadingText}>Đang tải hoạt động...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Hoạt động</ThemedText>
      </ThemedView>

      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <IconSymbol name="calendar.badge.exclamationmark" size={50} color={Colors[colorScheme ?? 'light'].icon} />
            <ThemedText style={styles.emptyText}>Không có hoạt động nào</ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  activityCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  pointsText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFC107',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
});
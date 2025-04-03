import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Giả lập dữ liệu hoạt động đã tham gia
const MOCK_ATTENDED_ACTIVITIES = [
  {
    id: '1',
    title: 'Hội thảo Khoa học Công nghệ',
    date: '15/10/2023',
    time: '08:00 - 17:00',
    location: 'Hội trường A1',
    points: 10,
    status: 'Đã tham gia',
  },
  {
    id: '4',
    title: 'Hiến máu nhân đạo',
    date: '10/09/2023',
    time: '09:00 - 11:30',
    location: 'Trung tâm Y tế',
    points: 20,
    status: 'Đã tham gia',
  },
  {
    id: '7',
    title: 'Hội thảo Khởi nghiệp',
    date: '25/09/2023',
    time: '13:30 - 16:30',
    location: 'Phòng hội thảo B3',
    points: 5,
    status: 'Đã tham gia',
  },
  {
    id: '8',
    title: 'Ngày hội Thể thao',
    date: '10/09/2023',
    time: '07:30 - 17:00',
    location: 'Sân vận động trường',
    points: 10,
    status: 'Đã tham gia',
  },
  {
    id: '9',
    title: 'Cuộc thi Tiếng Anh',
    date: '05/08/2023',
    time: '08:00 - 12:00',
    location: 'Hội trường C2',
    points: 15,
    status: 'Đã tham gia',
  },
  {
    id: '10',
    title: 'Hội thảo Kỹ năng mềm',
    date: '20/07/2023',
    time: '13:30 - 16:30',
    location: 'Phòng hội thảo D1',
    points: 8,
    status: 'Đã tham gia',
  },
];

export default function StudentHistoryScreen() {
  const colorScheme = useColorScheme();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    // Giả lập tải dữ liệu
    setTimeout(() => {
      setActivities(MOCK_ATTENDED_ACTIVITIES);
      // Tính tổng điểm
      const total = MOCK_ATTENDED_ACTIVITIES.reduce((sum, activity) => sum + activity.points, 0);
      setTotalPoints(total);
      setLoading(false);
    }, 1000);
  }, []);

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.activityItem}
      onPress={() => router.push(`/activities/${item.id}`)}
    >
      <ThemedView style={styles.activityContent}>
        <ThemedView style={styles.activityInfo}>
          <ThemedText style={styles.activityTitle}>{item.title}</ThemedText>
          
          <ThemedView style={styles.detailRow}>
            <IconSymbol name="calendar" size={16} color={Colors[colorScheme ?? 'light'].icon} />
            <ThemedText style={styles.detailText}>{item.date}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.detailRow}>
            <IconSymbol name="clock" size={16} color={Colors[colorScheme ?? 'light'].icon} />
            <ThemedText style={styles.detailText}>{item.time}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.detailRow}>
            <IconSymbol name="mappin" size={16} color={Colors[colorScheme ?? 'light'].icon} />
            <ThemedText style={styles.detailText}>{item.location}</ThemedText>
          </ThemedView>
        </ThemedView>
        
        <ThemedView style={styles.pointsContainer}>
          <ThemedText style={styles.pointsText}>+{item.points}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ThemedText>Đang tải...</ThemedText>
      </ThemedView>
    );
  }

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
        <ThemedText style={styles.headerTitle}>Lịch sử hoạt động</ThemedText>
      </ThemedView>

      <ThemedView style={styles.summaryContainer}>
        <ThemedText style={styles.summaryTitle}>Tổng điểm hoạt động</ThemedText>
        <ThemedText style={styles.summaryPoints}>{totalPoints}</ThemedText>
        <ThemedText style={styles.summarySubtitle}>từ {activities.length} hoạt động</ThemedText>
      </ThemedView>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivityItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>Bạn chưa tham gia hoạt động nào</ThemedText>
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
  summaryContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  summaryPoints: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  activityItem: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
  },
  activityContent: {
    padding: 16,
    flexDirection: 'row',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    opacity: 0.7,
  },
  pointsContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  pointsText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
});
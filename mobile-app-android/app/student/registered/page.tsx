import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Giả lập dữ liệu hoạt động đã đăng ký
const MOCK_REGISTERED_ACTIVITIES = [
  {
    id: '2',
    title: 'Cuộc thi Ý tưởng Sáng tạo',
    date: '20/10/2023',
    time: '13:30 - 17:00',
    location: 'Khu vực B2',
    status: 'Đã đăng ký',
    points: 15,
  },
  {
    id: '3',
    title: 'Ngày hội Việc làm',
    date: '05/11/2023',
    time: '08:30 - 16:30',
    location: 'Sân vận động trường',
    status: 'Đã đăng ký',
    points: 8,
  },
  {
    id: '5',
    title: 'Hội thảo Kỹ năng mềm',
    date: '18/11/2023',
    time: '14:00 - 17:00',
    location: 'Hội trường B3',
    status: 'Đã đăng ký',
    points: 5,
  },
];

export default function RegisteredActivitiesScreen() {
  const colorScheme = useColorScheme();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập tải dữ liệu
    setTimeout(() => {
      setActivities(MOCK_REGISTERED_ACTIVITIES);
      setLoading(false);
    }, 1000);
  }, []);

  const renderActivityItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.activityCard}
      onPress={() => router.push(`/activities/${item.id}`)}
    >
      <ThemedView style={styles.cardContent}>
        <ThemedText style={styles.activityTitle}>{item.title}</ThemedText>
        
        <ThemedView style={styles.activityDetails}>
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
        
        <ThemedView style={styles.cardFooter}>
          <ThemedView style={styles.statusBadge}>
            <ThemedText style={styles.statusText}>{item.status}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.pointsContainer}>
            <IconSymbol name="star" size={16} color="#FFC107" />
            <ThemedText style={styles.pointsText}>{item.points} điểm</ThemedText>
          </ThemedView>
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
        <ThemedText style={styles.headerTitle}>Hoạt động đã đăng ký</ThemedText>
      </ThemedView>

      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivityItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>Bạn chưa đăng ký hoạt động nào</ThemedText>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => router.push('/activities')}
            >
              <ThemedText style={styles.browseButtonText}>Xem danh sách hoạt động</ThemedText>
            </TouchableOpacity>
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
  listContainer: {
    padding: 16,
  },
  activityCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  activityDetails: {
    marginBottom: 12,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    marginLeft: 4,
    fontWeight: '500',
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
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  browseButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Giả lập dữ liệu cán bộ đoàn
const MOCK_UNION_WORKER = {
  id: '1',
  name: 'Trần Văn B',
  workerId: 'CB001',
  department: 'Đoàn Thanh niên',
  position: 'Cán bộ điểm danh',
  avatar: null, // Sẽ sử dụng avatar mặc định
};

// Giả lập dữ liệu hoạt động đang diễn ra
const MOCK_ONGOING_ACTIVITIES = [
  {
    id: '1',
    title: 'Hội thảo Khoa học Công nghệ',
    date: '15/10/2023',
    time: '08:00 - 17:00',
    location: 'Hội trường A1',
    totalRegistered: 45,
    totalAttended: 32,
  },
  {
    id: '2',
    title: 'Cuộc thi Ý tưởng Sáng tạo',
    date: '20/10/2023',
    time: '13:30 - 17:00',
    location: 'Khu vực B2',
    totalRegistered: 30,
    totalAttended: 25,
  },
];

// Giả lập dữ liệu hoạt động sắp tới
const MOCK_UPCOMING_ACTIVITIES = [
  {
    id: '3',
    title: 'Ngày hội Việc làm',
    date: '05/11/2023',
    time: '08:30 - 16:30',
    location: 'Sân vận động trường',
    totalRegistered: 60,
    totalAttended: 0,
  },
  {
    id: '4',
    title: 'Hiến máu nhân đạo',
    date: '10/11/2023',
    time: '07:30 - 11:30',
    location: 'Phòng Y tế',
    totalRegistered: 25,
    totalAttended: 0,
  },
];

export default function UnionWorkerDashboardScreen() {
  const colorScheme = useColorScheme();
  const [unionWorker, setUnionWorker] = useState(null);
  const [ongoingActivities, setOngoingActivities] = useState([]);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập tải dữ liệu
    setTimeout(() => {
      setUnionWorker(MOCK_UNION_WORKER);
      setOngoingActivities(MOCK_ONGOING_ACTIVITIES);
      setUpcomingActivities(MOCK_UPCOMING_ACTIVITIES);
      setLoading(false);
    }, 1000);
  }, []);

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
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Phần thông tin cán bộ đoàn */}
        <ThemedView style={styles.profileSection}>
          <ThemedView style={styles.profileHeader}>
            <ThemedView style={styles.avatarContainer}>
              {unionWorker.avatar ? (
                <Image source={{ uri: unionWorker.avatar }} style={styles.avatar} />
              ) : (
                <ThemedView style={[styles.avatarPlaceholder, { backgroundColor: '#0a7ea4' }]}>
                  <ThemedText style={styles.avatarText}>{unionWorker.name.charAt(0)}</ThemedText>
                </ThemedView>
              )}
            </ThemedView>
            <ThemedView style={styles.profileInfo}>
              <ThemedText style={styles.workerName}>{unionWorker.name}</ThemedText>
              <ThemedText style={styles.workerId}>Mã CB: {unionWorker.workerId}</ThemedText>
              <ThemedText style={styles.workerPosition}>{unionWorker.department} - {unionWorker.position}</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Phần chức năng chính */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Chức năng</ThemedText>
          
          <ThemedView style={styles.functionsGrid}>
            <TouchableOpacity 
              style={styles.functionCard}
              onPress={() => router.push('/union_worker/attendance')}
            >
              <ThemedView style={[styles.functionIcon, { backgroundColor: '#4CAF50' }]}>
                <IconSymbol name="checklist" size={24} color="white" />
              </ThemedView>
              <ThemedText style={styles.functionTitle}>Điểm danh</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.functionCard}
              onPress={() => router.push('/activities')}
            >
              <ThemedView style={[styles.functionIcon, { backgroundColor: '#2196F3' }]}>
                <IconSymbol name="calendar" size={24} color="white" />
              </ThemedView>
              <ThemedText style={styles.functionTitle}>Hoạt động</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.functionCard}
              onPress={() => router.push('/union_worker/history')}
            >
              <ThemedView style={[styles.functionIcon, { backgroundColor: '#FF9800' }]}>
                <IconSymbol name="clock.arrow.circlepath" size={24} color="white" />
              </ThemedView>
              <ThemedText style={styles.functionTitle}>Lịch sử</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.functionCard}>
              <ThemedView style={[styles.functionIcon, { backgroundColor: '#9C27B0' }]}>
                <IconSymbol name="chart.bar" size={24} color="white" />
              </ThemedView>
              <ThemedText style={styles.functionTitle}>Thống kê</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Phần hoạt động đang diễn ra */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Hoạt động đang diễn ra</ThemedText>
          </ThemedView>

          {ongoingActivities.length > 0 ? (
            ongoingActivities.map((activity) => (
              <TouchableOpacity 
                key={activity.id}
                style={styles.activityCard}
                onPress={() => router.push(`/union_worker/attendance?activityId=${activity.id}`)}
              >
                <ThemedView style={styles.activityInfo}>
                  <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                  <ThemedView style={styles.activityDetails}>
                    <ThemedView style={styles.detailItem}>
                      <IconSymbol name="calendar" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                      <ThemedText style={styles.detailText}>{activity.date}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.detailItem}>
                      <IconSymbol name="clock" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                      <ThemedText style={styles.detailText}>{activity.time}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.detailItem}>
                      <IconSymbol name="mappin" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                      <ThemedText style={styles.detailText}>{activity.location}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
                <ThemedView style={styles.attendanceStats}>
                  <ThemedText style={styles.attendanceText}>
                    {activity.totalAttended}/{activity.totalRegistered}
                  </ThemedText>
                  <ThemedText style={styles.attendanceLabel}>Tham gia</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            ))
          ) : (
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>Không có hoạt động nào đang diễn ra</ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        {/* Phần hoạt động sắp tới */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Hoạt động sắp tới</ThemedText>
          </ThemedView>

          {upcomingActivities.length > 0 ? (
            upcomingActivities.map((activity) => (
              <TouchableOpacity 
                key={activity.id}
                style={styles.activityCard}
                onPress={() => router.push(`/activities/${activity.id}`)}
              >
                <ThemedView style={styles.activityInfo}>
                  <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                  <ThemedView style={styles.activityDetails}>
                    <ThemedView style={styles.detailItem}>
                      <IconSymbol name="calendar" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                      <ThemedText style={styles.detailText}>{activity.date}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.detailItem}>
                      <IconSymbol name="clock" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                      <ThemedText style={styles.detailText}>{activity.time}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.detailItem}>
                      <IconSymbol name="mappin" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                      <ThemedText style={styles.detailText}>{activity.location}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
                <ThemedView style={styles.attendanceStats}>
                  <ThemedText style={styles.attendanceText}>
                    {activity.totalRegistered}
                  </ThemedText>
                  <ThemedText style={styles.attendanceLabel}>Đăng ký</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            ))
          ) : (
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>Không có hoạt động nào sắp tới</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workerId: {
    fontSize: 14,
    marginBottom: 4,
  },
  workerPosition: {
    fontSize: 14,
    opacity: 0.7,
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  functionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  functionCard: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
    alignItems: 'center',
  },
  functionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  functionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  activityCard: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  activityDetails: {
    gap: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
  },
  attendanceStats: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  attendanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  attendanceLabel: {
    fontSize: 12,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Giả lập dữ liệu sinh viên
const MOCK_STUDENT = {
  id: '1',
  name: 'Nguyễn Văn A',
  studentId: 'SV001',
  faculty: 'Công nghệ thông tin',
  class: 'CNTT2021',
  totalPoints: 45,
  rank: 'Xuất sắc',
  avatar: null, // Sẽ sử dụng avatar mặc định
};

// Giả lập dữ liệu hoạt động sắp tới
const MOCK_UPCOMING_ACTIVITIES = [
  {
    id: '2',
    title: 'Cuộc thi Ý tưởng Sáng tạo',
    date: '20/10/2023',
    time: '13:30 - 17:00',
    location: 'Khu vực B2',
    points: 15,
  },
  {
    id: '3',
    title: 'Ngày hội Việc làm',
    date: '05/11/2023',
    time: '08:30 - 16:30',
    location: 'Sân vận động trường',
    points: 8,
  },
];

// Giả lập dữ liệu hoạt động đã tham gia
const MOCK_ATTENDED_ACTIVITIES = [
  {
    id: '1',
    title: 'Hội thảo Khoa học Công nghệ',
    date: '15/10/2023',
    points: 10,
    status: 'Đã tham gia',
  },
  {
    id: '4',
    title: 'Hiến máu nhân đạo',
    date: '10/09/2023',
    points: 20,
    status: 'Đã tham gia',
  },
];

export default function StudentDashboardScreen() {
  const colorScheme = useColorScheme();
  const [student, setStudent] = useState(null);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [attendedActivities, setAttendedActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập tải dữ liệu
    setTimeout(() => {
      setStudent(MOCK_STUDENT);
      setUpcomingActivities(MOCK_UPCOMING_ACTIVITIES);
      setAttendedActivities(MOCK_ATTENDED_ACTIVITIES);
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
        {/* Phần thông tin sinh viên */}
        <ThemedView style={styles.profileSection}>
          <ThemedView style={styles.profileHeader}>
            <ThemedView style={styles.avatarContainer}>
              {student.avatar ? (
                <Image source={{ uri: student.avatar }} style={styles.avatar} />
              ) : (
                <ThemedView style={[styles.avatarPlaceholder, { backgroundColor: '#0a7ea4' }]}>
                  <ThemedText style={styles.avatarText}>{student.name.charAt(0)}</ThemedText>
                </ThemedView>
              )}
            </ThemedView>
            <ThemedView style={styles.profileInfo}>
              <ThemedText style={styles.studentName}>{student.name}</ThemedText>
              <ThemedText style={styles.studentId}>MSSV: {student.studentId}</ThemedText>
              <ThemedText style={styles.studentClass}>{student.faculty} - {student.class}</ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.statsContainer}>
            <ThemedView style={styles.statItem}>
              <ThemedText style={styles.statValue}>{student.totalPoints}</ThemedText>
              <ThemedText style={styles.statLabel}>Điểm hoạt động</ThemedText>
            </ThemedView>
            <ThemedView style={styles.statDivider} />
            <ThemedView style={styles.statItem}>
              <ThemedText style={styles.statValue}>{student.rank}</ThemedText>
              <ThemedText style={styles.statLabel}>Xếp loại</ThemedText>
            </ThemedView>
          </ThemedView>

          <TouchableOpacity 
            style={styles.viewProfileButton}
            onPress={() => router.push('/student/profile')}
          >
            <ThemedText style={styles.viewProfileButtonText}>Xem hồ sơ</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Phần hoạt động sắp tới */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Hoạt động sắp tới</ThemedText>
            <TouchableOpacity onPress={() => router.push('/activities')}>
              <ThemedText style={styles.viewAllText}>Xem tất cả</ThemedText>
            </TouchableOpacity>
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
                <ThemedView style={styles.pointsBadge}>
                  <ThemedText style={styles.pointsText}>{activity.points}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            ))
          ) : (
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>Không có hoạt động sắp tới</ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        {/* Phần hoạt động đã tham gia */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Hoạt động đã tham gia</ThemedText>
            <TouchableOpacity onPress={() => router.push('/student/history')}>
              <ThemedText style={styles.viewAllText}>Xem tất cả</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {attendedActivities.length > 0 ? (
            attendedActivities.map((activity) => (
              <ThemedView key={activity.id} style={styles.historyItem}>
                <ThemedView style={styles.historyInfo}>
                  <ThemedText style={styles.historyTitle}>{activity.title}</ThemedText>
                  <ThemedText style={styles.historyDate}>{activity.date}</ThemedText>
                </ThemedView>
                <ThemedView style={styles.historyPoints}>
                  <ThemedText style={styles.historyPointsText}>+{activity.points}</ThemedText>
                </ThemedView>
              </ThemedView>
            ))
          ) : (
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>Chưa có hoạt động nào</ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        {/* Phần quản lý hoạt động */}
        <TouchableOpacity 
          style={styles.activityManagementCard}
          onPress={() => router.push('/student/activities')}
        >
          <ThemedView style={styles.activityManagementContent}>
            <ThemedView style={styles.activityManagementIcon}>
              <IconSymbol name="list.bullet" size={24} color="white" />
            </ThemedView>
            <ThemedView style={styles.activityManagementInfo}>
              <ThemedText style={styles.activityManagementTitle}>Quản lý hoạt động</ThemedText>
              <ThemedText style={styles.activityManagementDescription}>Xem và quản lý tất cả hoạt động của bạn</ThemedText>
            </ThemedView>
            <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].icon} />
          </ThemedView>
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
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    marginBottom: 4,
  },
  studentClass: {
    fontSize: 14,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  viewProfileButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    alignItems: 'center',
  },
  viewProfileButtonText: {
    color: '#0a7ea4',
    fontWeight: '600',
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
  },
  viewAllText: {
    fontSize: 14,
    color: '#0a7ea4',
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
  pointsBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  pointsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    opacity: 0.7,
  },
  historyPoints: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  historyPointsText: {
    color: 'white',
    fontWeight: '600',
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
  activityManagementCard: {
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
  },
  activityManagementContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityManagementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityManagementInfo: {
    flex: 1,
  },
  activityManagementTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityManagementDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
});
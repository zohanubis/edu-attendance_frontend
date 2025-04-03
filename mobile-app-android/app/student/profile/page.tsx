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
  email: 'nguyenvana@example.edu.vn',
  phone: '0912345678',
  address: 'Quận 1, TP. Hồ Chí Minh',
  totalPoints: 45,
  rank: 'Xuất sắc',
  avatar: null, // Sẽ sử dụng avatar mặc định
};

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
  {
    id: '7',
    title: 'Hội thảo Khởi nghiệp',
    date: '25/09/2023',
    points: 5,
    status: 'Đã tham gia',
  },
  {
    id: '8',
    title: 'Ngày hội Thể thao',
    date: '10/09/2023',
    points: 10,
    status: 'Đã tham gia',
  },
];

export default function StudentProfileScreen() {
  const colorScheme = useColorScheme();
  const [student, setStudent] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập tải dữ liệu
    setTimeout(() => {
      setStudent(MOCK_STUDENT);
      setActivities(MOCK_ATTENDED_ACTIVITIES);
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
      
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Hồ sơ sinh viên</ThemedText>
      </ThemedView>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Phần thông tin sinh viên */}
        <ThemedView style={styles.profileSection}>
          <ThemedView style={styles.avatarContainer}>
            {student.avatar ? (
              <Image source={{ uri: student.avatar }} style={styles.avatar} />
            ) : (
              <ThemedView style={[styles.avatarPlaceholder, { backgroundColor: '#0a7ea4' }]}>
                <ThemedText style={styles.avatarText}>{student.name.charAt(0)}</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
          
          <ThemedText style={styles.studentName}>{student.name}</ThemedText>
          <ThemedText style={styles.studentId}>MSSV: {student.studentId}</ThemedText>
          <ThemedText style={styles.studentClass}>{student.faculty} - {student.class}</ThemedText>
          
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
        </ThemedView>

        {/* Phần thông tin liên hệ */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Thông tin liên hệ</ThemedText>
          
          <ThemedView style={styles.infoItem}>
            <IconSymbol name="envelope" size={20} color={Colors[colorScheme ?? 'light'].icon} />
            <ThemedText style={styles.infoText}>{student.email}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.infoItem}>
            <IconSymbol name="phone" size={20} color={Colors[colorScheme ?? 'light'].icon} />
            <ThemedText style={styles.infoText}>{student.phone}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.infoItem}>
            <IconSymbol name="mappin" size={20} color={Colors[colorScheme ?? 'light'].icon} />
            <ThemedText style={styles.infoText}>{student.address}</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Phần hoạt động đã tham gia */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Hoạt động đã tham gia</ThemedText>
            <TouchableOpacity onPress={() => router.push('/student/history')}>
              <ThemedText style={styles.viewAllText}>Xem tất cả</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {activities.map((activity) => (
            <ThemedView key={activity.id} style={styles.activityItem}>
              <ThemedView style={styles.activityInfo}>
                <ThemedText style={styles.activityTitle}>{activity.title}</ThemedText>
                <ThemedText style={styles.activityDate}>{activity.date}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.pointsContainer}>
                <ThemedText style={styles.pointsText}>+{activity.points}</ThemedText>
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>
        
        {/* Phần quản lý hoạt động */}
        <TouchableOpacity 
          style={styles.activityManagementButton}
          onPress={() => router.push('/student/activities')}
        >
          <ThemedView style={styles.activityManagementContent}>
            <IconSymbol name="list.bullet" size={20} color="white" />
            <ThemedText style={styles.activityManagementText}>Quản lý hoạt động</ThemedText>
          </ThemedView>
          <IconSymbol name="chevron.right" size={20} color="white" />
        </TouchableOpacity>

        {/* Phần nút đăng xuất */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => router.replace('/(auth)/login')}
        >
          <ThemedText style={styles.logoutButtonText}>Đăng xuất</ThemedText>
        </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 16,
    marginBottom: 4,
  },
  studentClass: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
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
  viewAllText: {
    fontSize: 14,
    color: '#0a7ea4',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 14,
    opacity: 0.7,
  },
  pointsContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  pointsText: {
    color: 'white',
    fontWeight: '600',
  },
  activityManagementButton: {
    margin: 16,
    marginTop: 0,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#0a7ea4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityManagementContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityManagementText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  logoutButton: {
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f44336',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
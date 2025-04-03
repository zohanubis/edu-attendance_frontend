import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Giả lập dữ liệu chi tiết hoạt động
const MOCK_ACTIVITY_DETAILS = {
  '1': {
    id: '1',
    title: 'Hội thảo Khoa học Công nghệ',
    date: '15/10/2023',
    time: '08:00 - 17:00',
    location: 'Hội trường A1',
    status: 'Đang diễn ra',
    description: 'Hội thảo Khoa học Công nghệ là sự kiện thường niên do Đoàn Thanh niên tổ chức nhằm tạo sân chơi cho sinh viên trao đổi, học hỏi và phát triển ý tưởng sáng tạo trong lĩnh vực công nghệ.',
    organizer: 'Đoàn Thanh niên Trường',
    contact: 'doanthanhnien@example.edu.vn',
    attendanceStatus: 'Chưa điểm danh',
    points: 10,
  },
  '2': {
    id: '2',
    title: 'Cuộc thi Ý tưởng Sáng tạo',
    date: '20/10/2023',
    time: '13:30 - 17:00',
    location: 'Khu vực B2',
    status: 'Sắp diễn ra',
    description: 'Cuộc thi Ý tưởng Sáng tạo là sân chơi dành cho sinh viên thể hiện khả năng sáng tạo và đổi mới. Các đội thi sẽ trình bày ý tưởng của mình trước ban giám khảo và khán giả.',
    organizer: 'Câu lạc bộ Sáng tạo',
    contact: 'clbsangtao@example.edu.vn',
    attendanceStatus: 'Chưa mở đăng ký',
    points: 15,
  },
};

export default function ActivityDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập tải dữ liệu
    setTimeout(() => {
      if (id && MOCK_ACTIVITY_DETAILS[id as string]) {
        setActivity(MOCK_ACTIVITY_DETAILS[id as string]);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAttendance = () => {
    Alert.alert(
      'Xác nhận tham gia',
      'Bạn có chắc chắn muốn đăng ký tham gia hoạt động này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            // Giả lập đăng ký thành công
            Alert.alert('Thành công', 'Bạn đã đăng ký tham gia hoạt động thành công!');
            // Cập nhật trạng thái
            setActivity(prev => ({
              ...prev,
              attendanceStatus: 'Đã đăng ký',
            }));
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ThemedText>Đang tải...</ThemedText>
      </ThemedView>
    );
  }

  if (!activity) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ThemedText>Không tìm thấy hoạt động</ThemedText>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ThemedText style={styles.backButtonText}>Quay lại</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ThemedView style={styles.header}>
        <TouchableOpacity 
          style={styles.backIcon} 
          onPress={() => router.back()}
        >
          <IconSymbol name="chevron.left" size={28} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Chi tiết hoạt động</ThemedText>
      </ThemedView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>{activity.title}</ThemedText>
          
          <ThemedView style={styles.infoSection}>
            <ThemedView style={styles.infoRow}>
              <IconSymbol name="calendar" size={20} color={Colors[colorScheme ?? 'light'].icon} />
              <ThemedText style={styles.infoText}>{activity.date}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.infoRow}>
              <IconSymbol name="clock" size={20} color={Colors[colorScheme ?? 'light'].icon} />
              <ThemedText style={styles.infoText}>{activity.time}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.infoRow}>
              <IconSymbol name="mappin" size={20} color={Colors[colorScheme ?? 'light'].icon} />
              <ThemedText style={styles.infoText}>{activity.location}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.infoRow}>
              <IconSymbol name="person.2" size={20} color={Colors[colorScheme ?? 'light'].icon} />
              <ThemedText style={styles.infoText}>{activity.organizer}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.infoRow}>
              <IconSymbol name="envelope" size={20} color={Colors[colorScheme ?? 'light'].icon} />
              <ThemedText style={styles.infoText}>{activity.contact}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.infoRow}>
              <IconSymbol name="star" size={20} color={Colors[colorScheme ?? 'light'].icon} />
              <ThemedText style={styles.infoText}>Điểm hoạt động: {activity.points}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.statusContainer}>
              <ThemedText style={styles.statusLabel}>Trạng thái: </ThemedText>
              <ThemedText style={[styles.statusValue, { color: activity.status === 'Đang diễn ra' ? '#4CAF50' : '#FF9800' }]}>
                {activity.status}
              </ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.statusContainer}>
              <ThemedText style={styles.statusLabel}>Điểm danh: </ThemedText>
              <ThemedText style={[styles.statusValue, { color: activity.attendanceStatus === 'Đã đăng ký' ? '#4CAF50' : '#757575' }]}>
                {activity.attendanceStatus}
              </ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Mô tả</ThemedText>
            <ThemedText style={styles.description}>{activity.description}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
      
      {activity.attendanceStatus === 'Chưa điểm danh' && (
        <ThemedView style={styles.footer}>
          <TouchableOpacity 
            style={styles.attendButton} 
            onPress={handleAttendance}
          >
            <ThemedText style={styles.attendButtonText}>Đăng ký tham gia</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
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
  backIcon: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoSection: {
    marginBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 16,
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  attendButton: {
    backgroundColor: '#0a7ea4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  attendButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  backButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
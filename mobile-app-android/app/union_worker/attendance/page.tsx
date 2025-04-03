import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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

// Giả lập dữ liệu sinh viên đăng ký tham gia
const MOCK_STUDENTS = {
  '1': [
    { id: '1', name: 'Nguyễn Văn A', studentId: 'SV001', attended: true },
    { id: '2', name: 'Trần Thị B', studentId: 'SV002', attended: true },
    { id: '3', name: 'Lê Văn C', studentId: 'SV003', attended: false },
    { id: '4', name: 'Phạm Thị D', studentId: 'SV004', attended: true },
    { id: '5', name: 'Hoàng Văn E', studentId: 'SV005', attended: false },
  ],
  '2': [
    { id: '6', name: 'Đỗ Văn F', studentId: 'SV006', attended: true },
    { id: '7', name: 'Ngô Thị G', studentId: 'SV007', attended: true },
    { id: '8', name: 'Vũ Văn H', studentId: 'SV008', attended: true },
    { id: '9', name: 'Đặng Thị I', studentId: 'SV009', attended: false },
    { id: '10', name: 'Bùi Văn K', studentId: 'SV010', attended: true },
  ],
};

export default function AttendanceManagementScreen() {
  const colorScheme = useColorScheme();
  const [activities, setActivities] = useState(MOCK_ONGOING_ACTIVITIES);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập tải dữ liệu
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedActivity) {
      // Tải danh sách sinh viên khi chọn hoạt động
      setStudents(MOCK_STUDENTS[selectedActivity.id] || []);
    } else {
      setStudents([]);
    }
  }, [selectedActivity]);

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
  };

  const handleToggleAttendance = (studentId) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, attended: !student.attended } 
        : student
    ));
  };

  const handleSaveAttendance = () => {
    Alert.alert(
      'Xác nhận lưu',
      'Bạn có chắc chắn muốn lưu thông tin điểm danh?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Lưu',
          onPress: () => {
            // Giả lập lưu thành công
            Alert.alert('Thành công', 'Đã lưu thông tin điểm danh thành công!');
            
            // Cập nhật số lượng tham gia
            const attendedCount = students.filter(s => s.attended).length;
            setActivities(activities.map(activity => 
              activity.id === selectedActivity.id 
                ? { ...activity, totalAttended: attendedCount } 
                : activity
            ));
          },
        },
      ],
    );
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.studentItem}
      onPress={() => handleToggleAttendance(item.id)}
    >
      <ThemedView style={styles.studentInfo}>
        <ThemedText style={styles.studentName}>{item.name}</ThemedText>
        <ThemedText style={styles.studentId}>{item.studentId}</ThemedText>
      </ThemedView>
      <ThemedView 
        style={[styles.attendanceStatus, { 
          backgroundColor: item.attended ? '#4CAF50' : 'transparent',
          borderColor: item.attended ? '#4CAF50' : 'rgba(0,0,0,0.2)'
        }]}
      >
        {item.attended ? (
          <IconSymbol name="checkmark" size={20} color="white" />
        ) : null}
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
        <ThemedText style={styles.headerTitle}>Quản lý điểm danh</ThemedText>
      </ThemedView>

      {!selectedActivity ? (
        <>
          <ThemedText style={styles.sectionTitle}>Hoạt động đang diễn ra</ThemedText>
          <FlatList
            data={activities}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.activityCard}
                onPress={() => handleSelectActivity(item)}
              >
                <ThemedView style={styles.activityInfo}>
                  <ThemedText style={styles.activityTitle}>{item.title}</ThemedText>
                  <ThemedView style={styles.activityDetails}>
                    <ThemedView style={styles.detailItem}>
                      <IconSymbol name="calendar" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                      <ThemedText style={styles.detailText}>{item.date}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.detailItem}>
                      <IconSymbol name="clock" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                      <ThemedText style={styles.detailText}>{item.time}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.detailItem}>
                      <IconSymbol name="mappin" size={16} color={Colors[colorScheme ?? 'light'].icon} />
                      <ThemedText style={styles.detailText}>{item.location}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
                <ThemedView style={styles.attendanceStats}>
                  <ThemedText style={styles.attendanceText}>
                    {item.totalAttended}/{item.totalRegistered}
                  </ThemedText>
                  <ThemedText style={styles.attendanceLabel}>Tham gia</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <ThemedView style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>Không có hoạt động nào đang diễn ra</ThemedText>
              </ThemedView>
            }
          />
        </>
      ) : (
        <>
          <ThemedView style={styles.selectedActivityHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedActivity(null)}
            >
              <IconSymbol name="chevron.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
            <ThemedText style={styles.selectedActivityTitle}>{selectedActivity.title}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.searchContainer}>
            <IconSymbol name="magnifyingglass" size={20} color={Colors[colorScheme ?? 'light'].icon} />
            <TextInput
              style={[styles.searchInput, { color: Colors[colorScheme ?? 'light'].text }]}
              placeholder="Tìm kiếm sinh viên..."
              placeholderTextColor={Colors[colorScheme ?? 'light'].icon}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </ThemedView>

          <ThemedView style={styles.attendanceHeader}>
            <ThemedText style={styles.attendanceHeaderText}>
              Đã điểm danh: {students.filter(s => s.attended).length}/{students.length}
            </ThemedText>
          </ThemedView>

          <FlatList
            data={filteredStudents}
            keyExtractor={(item) => item.id}
            renderItem={renderStudentItem}
            contentContainerStyle={styles.studentsList}
            ListEmptyComponent={
              <ThemedView style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>
                  {searchQuery ? 'Không tìm thấy sinh viên' : 'Chưa có sinh viên đăng ký'}
                </ThemedText>
              </ThemedView>
            }
          />

          <ThemedView style={styles.footer}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveAttendance}
            >
              <ThemedText style={styles.saveButtonText}>Lưu điểm danh</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </>
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  listContainer: {
    padding: 16,
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
  selectedActivityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  selectedActivityTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    padding: 8,
  },
  attendanceHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  attendanceHeaderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  studentsList: {
    padding: 16,
    paddingBottom: 80,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    opacity: 0.7,
  },
  attendanceStatus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  saveButton: {
    backgroundColor: '#0a7ea4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
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
});}
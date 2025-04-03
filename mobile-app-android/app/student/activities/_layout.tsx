import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StudentActivitiesLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Stack>
      <Stack.Screen 
        name="registered" 
        options={{
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="history" 
        options={{
          headerShown: false,
        }} 
      />
    </Stack>
  );
}
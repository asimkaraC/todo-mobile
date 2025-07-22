import { db } from '@/lib/firebaseConfig';
import styles from '@/styles/archiveStyles';
import { Task } from '@/types/database.type';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { collection, deleteDoc, doc, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, FlatList, Platform, Pressable, Text, ToastAndroid, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView } from 'react-native-safe-area-context';

const Archive = () => {

  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  const taskCollection = collection(db, 'tasks');

  useFocusEffect(
    React.useCallback(() => {
      loadArchivedTasks();
    }, [])
  );

  const formatDate = (date: Date | Timestamp) => {
    const dateObj = date instanceof Timestamp ? date.toDate() : date;
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
  };

  const loadArchivedTasks = async () => {
    try {
      const _query = query(taskCollection, where('archived', '==', true));
      const querySnapshot = await getDocs(_query);
      const archivedTasks: Task[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      setArchivedTasks(archivedTasks);

    } catch (error) {
      console.error('Error loading archived tasks:');
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed to load tasks', ToastAndroid.SHORT);
      } else if (Platform.OS === 'ios') {
        Alert.alert('Error', 'Failed to load tasks');
      }
    }
  }

  const deleteArchivedTask = (archivedTaskId: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {            

            try {
              await deleteDoc(doc(db, 'tasks', archivedTaskId));
              loadArchivedTasks(); // Refresh the list after deletion
              if (Platform.OS === 'android') {
                ToastAndroid.show('Task deleted successfully', ToastAndroid.SHORT);
              }
              else if (Platform.OS === 'ios') {
                Alert.alert('Success', 'Task deleted successfully');
              }
            } catch (error) {
              console.error('Error deleting archived task:', error);
              if (Platform.OS === 'android') {
                ToastAndroid.show('Failed to delete task', ToastAndroid.SHORT);
              } else if (Platform.OS === 'ios') {
                Alert.alert('Error', 'Failed to delete task');
              }
            }
          }
        }
      ]
    );
  };

  const restoreArchivedTask = (archivedTaskId: string) => {
    Alert.alert(
      'Confirm Restore',
      'Are you sure you want to restore this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restore',
          onPress: async () => {            
            try {
              // const archivedTaskDoc = doc(db, 'tasks', archivedTaskId);
              // await updateDoc(archivedTaskDoc, { archived: false });
              // await updateDoc(archivedTaskDoc, { done: false }); 
              await updateDoc(doc(db, 'tasks', archivedTaskId), {
                archived: false,
                done: false,
              });


              if (Platform.OS === 'android') {
                ToastAndroid.show('Task restored successfully', ToastAndroid.SHORT);
              }
              else if (Platform.OS === 'ios') {
                Alert.alert('Success', 'Task restored successfully');
              }

              loadArchivedTasks(); 
            } catch (error) {
              console.error('Error restoring archived task:', error);
              if (Platform.OS === 'android') {
                ToastAndroid.show('Failed to restore task', ToastAndroid.SHORT);
              } else if (Platform.OS === 'ios') {
                Alert.alert('Error', 'Failed to restore task');
              }
            }
          }
        }
      ]
    );
  }
    
  const renderTask = ({ item }: { item: Task }) => (
    <Swipeable
      friction={1}       
      renderLeftActions={() => (
        <Pressable onPress={() => restoreArchivedTask(item.id)} style={[styles.actionButton, {backgroundColor: '#4CAF50'}]}>
          <MaterialIcons name="restore" size={24} color="#fff" />
        </Pressable>
      )}
      renderRightActions={() => (
        <Pressable onPress={() => deleteArchivedTask(item.id)} style={[styles.actionButton, {backgroundColor: '#ff4444'}]}>
          <MaterialIcons name="delete" size={24} color="#fff" />
        </Pressable>
      )}
    >
      <View style={styles.container}>
        <View style={[styles.textInput, styles.taskDisplay, {marginBottom: 15}]}>
          <Text style={[styles.doneText, {color:'#fff'}]}>{item.description}</Text>
        </View>
        <View style={[styles.textInput, styles.dateDisplay, {marginBottom: 15}]}>
          <Text style={[styles.doneText, {color:'#fff'}]}>{formatDate(item.deadline)}</Text>
        </View>
      </View>
    </Swipeable>
    
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={styles.wrapper}>
        <View>
          <Text style={[styles.title]}>Archived Tasks</Text>
        </View>
        <View style={styles.listHeader}>
          <Text style={[styles.headerText, { flex: 2.5 }]}>Task</Text>
          <Text style={[styles.headerText, { flex: 0.6 }]}>Deadline</Text>
        </View>

        <FlatList
          data={[...archivedTasks].sort((a, b) => a.deadline.toDate().getTime() - b.deadline.toDate().getTime())}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          ListEmptyComponent={
            <Text style={styles.empty}>No archived tasks</Text>
          }
        />
      </View>
    </SafeAreaView>
  )
}

export default Archive


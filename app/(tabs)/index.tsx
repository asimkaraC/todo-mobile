import { auth, db } from '@/lib/firebaseConfig';
import styles from '@/styles/indexStyles';
import { Task } from '@/types/database.type';
import { MaterialIcons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { signOut as firebaseSignOut } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Index () {
  const [date, setDate] = useState<Date>(new Date());
  const [task, setTask] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [added, setAdded] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dateInputY, setDateInputY] = useState(0);

  const taskCollection = collection(db, 'tasks');

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    try {
      const _query = query(taskCollection, where('archived', '==', false), where('userId', '==', auth.currentUser?.uid || ''));
      const querySnapshot = await getDocs(_query);
      const loadedTasks: Task[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() 
      })) as Task[];

      setTasks(loadedTasks);
    } catch (error) {
      console.error('Failed to load tasks', error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed to load tasks', ToastAndroid.SHORT);
      } else if (Platform.OS === 'ios') {
        Alert.alert('Error', 'Failed to load tasks');
      }
    }
  }

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);

      if (event.type === 'dismissed') {
        return;
      }
    }
    if (selectedDate) setDate(selectedDate);
  };

  const formatDate = (date: Date | Timestamp) => {
    const dateObj = date instanceof Timestamp ? date.toDate() : date;
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
  };

  const handleAddTask = async () => {
    if (task.trim().length === 0) {
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    try {
        const newTask: Omit<Task, 'id'> = {
        description: task.trim(),
        deadline: Timestamp.fromDate(date),
        done: false,
        archived: false,
        userId: auth.currentUser?.uid || '',
      };

      const docRef = await addDoc(taskCollection, newTask);
      const firebaseGeneratedId = docRef.id;

      await updateDoc(docRef, { id: firebaseGeneratedId });

      setTask('');
      setDate(new Date());
      setAdded(true);
      loadTasks();

      if (Platform.OS === 'android') {
        ToastAndroid.show('Task added!', ToastAndroid.SHORT);
      } else if (Platform.OS === 'ios') {
        Alert.alert('Success', 'Task added!');
      }
    } catch (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed to add task', ToastAndroid.SHORT);
      } else if (Platform.OS === 'ios') {
        Alert.alert('Error', 'Failed to add task');
      }
      return;
    }

    setTimeout(() => setAdded(false), 2000);
  };

  const showTaskOptions = (task: Task) => {
    Alert.alert(
      'Options',
      `${task.description}\nDeadline: ${formatDate(task.deadline)}`,
      [
        {
          text: task.done ? 'Undo done' : 'Mark as done',
          onPress: () => toggleDone(task.id, task.done),
        },
        {
          text: 'Move to Archive',
          onPress: () => archiveTask(task.id),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(task.id),
        },
        { text: 'Cancel', style: 'cancel' },
      ], 
      { cancelable: true }
    );
  };

  const toggleDone = async (taskId: string, state: boolean) => {

    const taskDoc = doc(db, 'tasks', taskId);
    await updateDoc(taskDoc, { done: !state });
    loadTasks();

  };

  const deleteTask = (taskId: string) => {
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
              await deleteDoc(doc(db, 'tasks', taskId));
              loadTasks();
              
              if (Platform.OS === 'android') {
                ToastAndroid.show('Task deleted!', ToastAndroid.SHORT);
              } else if (Platform.OS === 'ios') {
                Alert.alert('Success', 'Task deleted!');
              }
            } catch (error) {
              console.error('Failed to delete task:', error);
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

  const archiveTask = async (taskId: string) => {
    try {
      const taskToArchive = doc(db, 'tasks', taskId);
      const taskSnapShot = await getDoc(taskToArchive);

      if (taskSnapShot.exists()){
        const taskData = taskSnapShot.data();

        if (taskData.done === true) {
          await updateDoc(taskToArchive, { archived: true });
          loadTasks();

          if (Platform.OS === 'android') {
            ToastAndroid.show('Task archived!', ToastAndroid.SHORT);
          } else if (Platform.OS === 'ios') {
            Alert.alert('Success', 'Task archived!');
          }
        } else {
          if (Platform.OS === 'android') {
            ToastAndroid.show('Task must be marked as done before archiving', ToastAndroid.SHORT);
          } else if (Platform.OS === 'ios') {
            Alert.alert('Error', 'Task must be marked as done before archiving');
          }
        }
      }     
    } catch (error) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed to archive task', ToastAndroid.SHORT);
      } else if (Platform.OS === 'ios') {
        Alert.alert('Error', 'Failed to archive task');
      }
    }
  }

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.displayTasks}>
      <View style={[styles.textInput, styles.taskInput, {marginBottom: 15}]}>
        <Text style={[{color:'#fff'}, item.done && styles.doneText]}>{item.description}</Text>
      </View>
      <View style={[styles.textInput, styles.dateInput, {marginBottom: 15}]}>
        <Text style={[{color:'#fff'}, item.done && styles.doneText]}>{formatDate(item.deadline)}</Text>
      </View>
      <Pressable onPress={() => showTaskOptions(item)} style={styles.actionButton}>
        <SimpleLineIcons name="options" size={24} color="#fff" />
      </Pressable>
    </View>
    
  );

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.replace('/auth');
    } catch (error) {
      console.log('Sign out error:', error);
      if (Platform.OS === 'android') {
        ToastAndroid.show('Failed to sign out', ToastAndroid.SHORT);
      }
      else if (Platform.OS === 'ios') {
        Alert.alert('Error', 'Failed to sign out');
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        
        <View style={styles.titleRow}>
          <Text style={[styles.title]}>Home</Text>
          { <Pressable
            style={styles.signOutButton}
            onPress={signOut}
          > 
            <Octicons name="sign-out" size={24} color="red" />
          </Pressable> }
        </View>

        <View style={styles.container}>
          <TextInput
            value={task}
            onChangeText={setTask}
            style={[styles.textInput, styles.taskInput]}
            placeholder="Enter your task here"
            placeholderTextColor="#aaa"
          />
          <Pressable
            style={[styles.textInput, styles.dateInput]}
            onPress={() => setShowDatePicker(true)}
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setDateInputY(y+150);
            }}
          >
            <Text style={{ color: '#aaa' }}>{formatDate(date)}</Text>
          </Pressable>

          <Pressable onPress={handleAddTask} style={[styles.iconButton, { backgroundColor: added ? 'limegreen' : '#fff' }]}>
            <MaterialIcons
              name={added ? 'check' : 'assignment-add'}
              size={24}
              color={added ? '#fff' : '#000'}
            />
          </Pressable>
        </View>

        <View style={styles.listHeader}>
          <Text style={[styles.headerText, { flex: 2.5 }]}>Task</Text>
          <Text style={[styles.headerText, { flex: 1 }]}>Deadline</Text>
        </View>
        
        <FlatList
          data={[...tasks].sort((a, b) => a.deadline.toDate().getTime() - b.deadline.toDate().getTime())}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
        />

        {showDatePicker && (
          <Pressable
            onPress={() => setShowDatePicker(false)}
            style={styles.dismissOverlay}
          >
            <View style={Platform.OS === 'ios' ? [styles.iosPickerOverlay, {top: dateInputY}] : undefined}>
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                minimumDate={new Date()}
                onChange={onChange}
              />
            </View>
          </Pressable>
        )}
        
      </View>
    </SafeAreaView>
  );
};


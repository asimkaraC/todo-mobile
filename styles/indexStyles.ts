import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  
  titleRow: {
    // flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    // flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // selectButton: {
  //   // flex: 0,
  //   // textAlign: 'right',
  //   justifyContent: 'center',
  //   position: 'absolute',
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   // paddingHorizontal: 10,
  // },

  // iosSelectButton: {
  //   color: '#007AFF',
  //   fontSize: 18,
  // },

  // androidSelectButton: {
  //   color: '#fff',
  //   fontSize: 18,
  // },

  iosPickerOverlay: {
    position: 'absolute',
    left: 10, // match your input padding
    right: 10,
    zIndex: 999,
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
  },

  dismissOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },

  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },

  container: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center',
    marginTop: 40,
  },

  displayTasks: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center',
  },

  textInput: {
    justifyContent: 'center',
    height: 45,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#333',
  },

  taskInput: {
    flex: 3,
    justifyContent: 'center',
  },

  dateInput: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconButton: { 
    flex: 0, 
    height: 45,
    aspectRatio: 0.9,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  listHeader: {
    flexDirection: 'row',
    paddingBottom: 4,
    marginTop: 40,
  },

  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  
  taskRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
    alignItems: 'center',
  },

  taskText: {
    flex: 3,
    color: '#fff',
  },

  deadlineText: {
    flex: 1,
    color: '#ccc',
  },

  doneText: {
    textDecorationLine: 'line-through',
    color: '#777',
  },

  actionButton: {
    flex: 0,
    height: 45,
    aspectRatio: 0.9,
    backgroundColor: '#000', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default styles;

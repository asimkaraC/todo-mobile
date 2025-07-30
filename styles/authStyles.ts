import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },

    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },

    title: {
        marginBottom: 32,
        color: '#fff',
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
    },

    input: {
        marginTop: 12,
        width: '90%',
        justifyContent: 'center',
        height: 40,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: '#fff',
        backgroundColor: '#333',
    },
    
    errorMsg: {
        color: '#fd2828fb',
        marginTop: 16,
        textAlign: 'center',
    },

    button: {
        marginTop: 24,
        backgroundColor: 'cyan',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',

    },

    switchModeButton: {
        marginTop: 32,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        justifyContent: 'center',
    },





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

  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
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

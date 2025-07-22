import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },

  title: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },

  container: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center',
    backgroundColor: '#000',
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

  doneText: {
    textDecorationLine: 'line-through',
    color: '#777',
  },

  taskDisplay: {
    flex: 3,
    justifyContent: 'center',
  },

  dateDisplay: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 15,
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

   empty: {
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default styles;
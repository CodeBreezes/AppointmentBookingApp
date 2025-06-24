import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pageContainer: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
    padding: 20,
  },
  customHeader: {
    backgroundColor: '#28a745',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    overflow: 'hidden',
    height: 42,
    justifyContent: 'center',
  },
  picker: {
    height: 42,
    width: '100%',
    color: '#333',
    fontSize: 15,
  },
  dropdownTouchable: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  dateButton: {
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateButtonText: {
    color: '#333',
    fontSize: 15,
  },
  bookButton: {
    backgroundColor: '#7442ff',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  serviceCard: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  serviceCard: {
  backgroundColor: '#f1f1f1',
  borderRadius: 10,
  paddingVertical: 12,     // reduced from 16
  paddingHorizontal: 14,
  marginBottom: 8,         // reduced gap between boxes
},

serviceRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 4,
},

serviceName: {
  fontSize: 15,            // reduced from 16
  fontWeight: '600',
  color: '#333',
},

serviceCost: {
  fontSize: 15,
  fontWeight: '600',
  color: '#28a745',
},

serviceDescription: {
  fontSize: 13,
  color: '#666',
  marginTop: 2,
},

  modalClose: {
    marginTop: 12,
    alignSelf: 'center',
    padding: 10,
  },
  modalCloseText: {
    color: '#ff5252',
    fontSize: 16,
    fontWeight: '600',
  },
});
import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    height: 'auto',
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: '1px solid black',
  },
  header: {
    fontSize: '12px',
  },
  headerTitulo: {
    fontWeight: 'bold',
  },
  headerTexto: {},
  headerLogo: {
    width: '85px',
    height: 'auto',
  },
});

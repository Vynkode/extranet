import { Font, StyleSheet } from '@react-pdf/renderer';
import Roboto from '../../assets/fonts/Roboto/RobotoRegular.ttf';
import RobotoBold from '../../assets/fonts/Roboto/RobotoBold.ttf';
import RobotoMediumItalic from '../../assets/fonts/Roboto/RobotoMediumItalic.ttf';

// Font.register({
//   family: 'Roboto',
//   src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc4.woff2',
// });

Font.register({
  family: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fonts: [
    { src: Roboto },
    { src: RobotoMediumItalic, fontWeight: '500', fontStyle: 'oblique' },
    { src: RobotoBold, fontWeight: 'bold' },
  ],
});

export const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontSize: 8,
    margin: [20, 0, 0, 0],
    fontFamily: 'Roboto',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    margin: [5, 20],
    justifyContent: 'space-between',
  },
  sectionItem: {
    flexGrow: 1,
  },
  sectionTitle: {
    flexGrow: 1,
    textAlign: 'center',
    color: '#ffffff',
    padding: [1, 0],
    // border: '1px solid black',
    backgroundColor: 'rgb(159, 48, 48)',
    fontWeight: 'bold',
  },
  sectionPresupuesto: {
    display: 'flex',
    flexDirection: 'column',
    padding: [5, 10],
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerTitulo: {
    fontWeight: 'bold',
  },
  headerTexto: {},
  headerLogo: {
    width: '180px',
  },
  textTitle: {
    fontSize: 7,
    fontWeight: '500',
    fontStyle: 'oblique',
    padding: [2, 0],
  },
  textItem: {
    padding: [1, 0],
  },
  textRight: {
    textAlign: 'right',
  },
});

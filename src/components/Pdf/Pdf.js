import React from 'react';
import { PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create Styles
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    color: '#000000',
    textAlign: 'center',
    width: '90%',
    margin: '0 auto',
    flexGrow: 1,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const ResguardoPDF = ({ userData, repairData }) => (
  <Document style={styles.document}>
    <Page size='A4' style={styles.page}>
      <View style={styles.header} fixed>
        <Text>Resguardo</Text>
        <Text></Text>
      </View>
      <View style={styles.content}></View>
      <View style={styles.footer} fixed>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export const RepairPDF = ({ userData, repairData }) => (
  <Document>
    <Page></Page>
  </Document>
);

export const BudgetPDF = ({ userData, repairData }) => (
  <Document>
    <Page></Page>
  </Document>
);

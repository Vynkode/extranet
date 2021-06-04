import React from 'react';

import { pdfStyles } from './pdf-styles';
import logo from '../../assets/img/logo.png';

import { Document, Page, View, Text, Image } from '@react-pdf/renderer';

const RepairPDF = ({ user, repair }) => {
  return (
    <Document title={repair.numero}>
      <Page style={pdfStyles.page} orientation="landscape">
        <View style={pdfStyles.section}>
          <View style={pdfStyles.header}>
            <Text style={pdfStyles.headerTitulo}>
              Servicio Integral de Relojería MGV S.L.U
            </Text>
            <Text style={pdfStyles.headerTexto}>B64544620</Text>
            <Text>C/ Jonqueres, 14 08003 Barcelona</Text>
            <Text>info@mgvwatch.com</Text>
          </View>
          <Image src={logo} />
          <View style={pdfStyles.header}>
            <Text style={pdfStyles.headerTitulo}>{user.name}</Text>
            <Text style={pdfStyles.headerTexto}>{user.taxID}</Text>
            <Text>
              `${user.street}, ${user.postalCode} ${user.city}`
            </Text>
            <Text>info@mgvwatch.com</Text>
          </View>
        </View>
        <View style={pdfStyles.section}>
          <Text>Resguardo</Text>
        </View>
        <View style={pdfStyles.section}>
          <Text>Presupuesto</Text>
        </View>
        <View style={pdfStyles.section}>
          <Text>Reparación</Text>
        </View>
        <View style={pdfStyles.section}>
          <Text>Entrega</Text>
        </View>
      </Page>
    </Document>
  );
};

export default RepairPDF;

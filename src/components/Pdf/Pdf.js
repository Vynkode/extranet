import React from 'react';
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';

import { pdfStyles } from './pdf-styles';
import logo from '../../assets/img/logo-pdf.png';

const Pdf = ({ user, repair }) => {
  return (
    <Document title={repair.numero}>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <View style={pdfStyles.header}>
            <Text style={pdfStyles.headerTitulo}>
              Servicio Integral de Relojería MGV S.L.U
            </Text>
            <Text style={pdfStyles.headerTexto}>B64544620</Text>
            <Text>C/ Jonqueres, 14 08003 Barcelona</Text>
            <Text>info@mgvwatch.com</Text>
          </View>
          <Image src={logo} style={pdfStyles.headerLogo} />
          <View style={pdfStyles.header}>
            <Text style={pdfStyles.headerTitulo}>{user.name}</Text>
            <Text style={pdfStyles.headerTexto}>{user.taxID}</Text>
            <Text>
              {user.street}, {user.postalCode} {user.city}
            </Text>
            <Text>{user.email}</Text>
          </View>
        </View>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>RESGUARDO {repair.numero}</Text>
        </View>
        <View style={pdfStyles.section}>
          <View style={pdfStyles.sectionItem}>
            <Text style={pdfStyles.textItem}>
              <Text style={pdfStyles.textTitle}>Fecha Entrada: </Text>
              {repair.f_entrada}
            </Text>
            <Text style={pdfStyles.textItem}>
              <Text style={pdfStyles.textTitle}>Tipo Reparación: </Text>
              {repair.tipo_reparacion}
            </Text>
            {repair.tipo_reparacion === 'Garantía' ? (
              <Text style={pdfStyles.textItem}>
                <Text style={pdfStyles.textTitle}>Fecha Compra: </Text>
                {repair.f_compra}
              </Text>
            ) : (
              <Text />
            )}
            {repair.tipo_reparacion === 'No Garantía' ? (
              <Text style={pdfStyles.textItem}>
                <Text style={pdfStyles.textTitle}>Presupuesto: </Text>
                {repair.presupuestar}
              </Text>
            ) : (
              <Text />
            )}
          </View>
          <View>
            <Text style={pdfStyles.textItem}>
              <Text style={pdfStyles.textTitle}>Marca: </Text>
              {repair.marca}
            </Text>
            <Text style={pdfStyles.textItem}>
              <Text style={pdfStyles.textTitle}>Modelo: </Text>
              {repair.marca === 'CASIO' ? repair.modelo : repair.ref2}
            </Text>
            <Text style={pdfStyles.textItem}>
              <Text style={pdfStyles.textTitle}>Tipo: </Text>
              {repair.marca === 'CASIO'
                ? repair.tipo_aparato
                : repair.tipo_aparato + ' ' + repair.modelo}
            </Text>
          </View>
        </View>
        <View style={pdfStyles.section}>
          <View>
            <Text style={[pdfStyles.textItem, pdfStyles.textTitle]}>
              Averia
            </Text>
            <Text style={pdfStyles.textItem}>{repair.averia}</Text>
          </View>
          <View>
            <Text style={[pdfStyles.textItem, pdfStyles.textTitle]}>
              Observaciones
            </Text>
            <Text style={pdfStyles.textItem}>{repair.observaciones}</Text>
          </View>
        </View>
        {repair.presupuestar === 'Sí' ? (
          <>
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>PRESUPUESTO</Text>
            </View>
            <View style={pdfStyles.section}>
              <View>
                <Text style={pdfStyles.textItem}>
                  <Text style={pdfStyles.textTitle}>Fecha Presupuesto: </Text>
                  {repair.f_presupuesto}
                </Text>
                <Text style={pdfStyles.textItem}>{repair.presupuesto}</Text>
              </View>
              <View>
                <Text style={pdfStyles.textItem}>{repair.p_liquido} €</Text>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
        {repair.f_reparacion ? (
          <>
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>REPARACION</Text>
            </View>
            <View style={pdfStyles.section}>
              <View>
                <Text style={pdfStyles.textItem}>
                  <Text style={pdfStyles.textTitle}>Fecha Reparación: </Text>
                  {repair.f_reparacion}
                </Text>
                <Text style={pdfStyles.textItem}>{repair.reparacion}</Text>
              </View>
              <View>
                <Text style={pdfStyles.textItem}>{repair.f_liquido} €</Text>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
        {repair.f_entrega ? (
          <>
            <View style={pdfStyles.section}>
              <Text style={pdfStyles.sectionTitle}>ENTREGA</Text>
            </View>
            <View style={pdfStyles.section}>
              <View>
                <Text style={[pdfStyles.textItem, pdfStyles.textTitle]}>
                  Fecha Entrega
                </Text>
                <Text style={pdfStyles.textItem}>{repair.f_entrega}</Text>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
      </Page>
    </Document>
  );
};

export default Pdf;

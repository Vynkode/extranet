import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDF from '../Pdf/Pdf';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ModalPDF.css';
import { pdfStyles } from './pdf-styles';
// import logo from '../../assets/img/logo-pdf.png';

const ModalPDF = ({ user, repair, pdfShow, setPdfShow }) => {
  return (
    <div className="modal-wrapper-pdf">
      <div className="modal-header-pdf">
        <p>{`Reparación ${repair.numero}`}</p>
        <FontAwesomeIcon
          onClick={() => setPdfShow(false)}
          className="times-close"
          icon="times"
        />
      </div>
      <PDFViewer className="pdf-viewer">
        <PDF user={user} repair={repair} />
      </PDFViewer>
    </div>
  );
};

export default ModalPDF;

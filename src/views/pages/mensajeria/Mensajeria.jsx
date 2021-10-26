import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CJumbotron,
    CRow,
    CEmbed,
    CEmbedItem,
    CInput,
    CInputGroup,
    CInputGroupText,
    CInputGroupPrepend,
    CInputGroupAppend,
    CFormGroup,
    CLabel,
    CTextarea,
    CImg
  } from '@coreui/react';
  import PublicFooter from '../global/PublicFooter';
  import PublicHeader from '../global/PublicHeader';
  import Clients from '../home/Clients'
  import HeaderImage from './HeaderImage';
  import InfoForm from './InfoForm';

function Mensajeria(props) {
    return (
        <>
            <PublicHeader />
            <HeaderImage />
            <InfoForm />
            <Clients />
            <PublicFooter />  
        </>
    )
}

Mensajeria.propTypes = {

}

export default Mensajeria


import React, {useState} from 'react'
import PropTypes from 'prop-types'
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
import CIcon from '@coreui/icons-react';

function InfoForm(props) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        empresa: '',
        fecha_entrega: '',
        paquetes: ''
    });

    const handleChangeForm = (e) =>{
        const {id, value} = e.target;
        const form_object = JSON.parse(JSON.stringify(form));
        let new_form = {
            ...form_object,
            [id]: value
        };
        setForm(new_form);
    }

    const onSubmit = () => {

    }

    return (
        <>
            <CContainer className="mt-5 info-form">
                <CRow>
                    <CCol>
                        <h2 className="title">
                            Mensajeria Corporativa
                        </h2>
                    </CCol>
                </CRow>
                <CRow className="mt-5 form">
                    <CCol sm="6">
                        <CRow className="">
                            <p className="d-inline-flex copy">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type 
                                specimen book. 
                            </p>
                            
                        </CRow>
                        <br/>
                        <ItemList text="Reporteria"/> 
                        <ItemList text="Prueba de entrega (P.O.D.)"/> 
                        <ItemList text="Seguro en tránsito"/> 
                        <ItemList text="Atención personalizada"/> 
                        <br/>
                        <br/>
                    </CCol>
                    <CCol sm="6">
                        <CCard className="form-card">
                            <CCardBody>
                                <br/>
                                <CFormGroup>
                                    <CInput value={form.name} id="name" type="text" onChange={handleChangeForm} placeholder="Nombre y Apellido" required/>
                                </CFormGroup>
                                <CFormGroup>
                                    <CInput value={form.email} id="email" type="email" onChange={handleChangeForm} placeholder="Correo electrónico" required/>
                                </CFormGroup>
                                <CFormGroup>
                                    <CInput value={form.phone} id="phone" type="tel" onChange={handleChangeForm} placeholder="Teléfono: 0000-0000" pattern="[0-9]{4}-[0-9]{4}" required/>
                                </CFormGroup>
                                <CFormGroup>
                                    <CInput value={form.empresa} id="empresa" type="text" onChange={handleChangeForm} placeholder="Empresa*" required/>
                                </CFormGroup>
                                <CFormGroup>
                                    <CInput value={form.fecha_entrega} id="fecha_entrega" type="text" onChange={handleChangeForm} placeholder="Fecha de entrega*" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CInput value={form.paquetes} id="paquetes" type="text" onChange={handleChangeForm} placeholder="Cantidad de paquetes*" />
                                </CFormGroup>

                                <CFormGroup className="form-actions" style={{marginBottom: '0'}}>
                                    <CRow className="justify-content-md-center item-buttons">
                                        <CCol className="col-md-auto">
                                            <CButton className="button" type="submit" size="lg" color="secondary" onClick={onSubmit}>Conectar</CButton>
                                        </CCol>
                                    </CRow>
                                </CFormGroup>

                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </>
    )
}

function ItemList(props){
    return(
        <>
            <CRow className="item_list" style={{marginLeft:'2rem'}}>
                <CIcon 
                    name="cil-check" 
                    style={{
                        marginRight: '1rem',
                        color: '#46b9ef'
                    }} />
                {props.text}
            </CRow>
        </>
    )

}


InfoForm.propTypes = {

}

export default InfoForm


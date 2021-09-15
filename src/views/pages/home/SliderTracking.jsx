import React from 'react'
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
    CTextarea
  } from '@coreui/react'
  import { DocsLink } from 'src/reusable'
  import CIcon from '@coreui/icons-react'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SliderTracking(props) {
    return (
        <>
         <CRow className="home-slider">
            <CCol lg="8"  className="col-slider">
                <CCard className="home-slider-card">
                    {/* <CCardBody> */}
                    <CJumbotron 
                    className="border home-slider-background" 
                    // style={{paddingTop:'10rem'}}
                    >   
                        <CContainer className="home-slider-container">
                            <CRow className="align-items-end row-tracking">
                                <CCol lg="5" className="align-self-end">
                                    <h1 className="display-3 title">
                                        ¿Dónde está <br/>
                                        mi paquete?
                                    </h1>
                                </CCol>
                                    <CCol lg="7" className="align-self-end search-input">
                                    <CInputGroup className="mb-1 input-tracker">
                                        <CInput 
                                            type="text" 
                                            placeholder="" 
                                            style={{
                                                background:'white', 
                                                border: '0px',
                                                fontSize: '1.5rem'
                                            }}
                                        />
                                        <CInputGroupAppend>
                                            <CInputGroupText>
                                            <FontAwesomeIcon 
                                                icon={faSearch}  
                                                style={{marginRight:'.3rem'}} 
                                                size="2x"
                                            />
                                                </CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CContainer>
                    </CJumbotron>
                </CCard>
            </CCol>
            <CCol lg="4" className="col-form">
                <CCard className="home-form">
                    <CCardBody >
                        <CRow className="justify-content-md-center">
                            <CCol>
                                <h3
                                    className="title"
                                >Quiero Conectarme:</h3>
                            </CCol>
                        </CRow>
                        <CFormGroup>
                            <CInput id="name" type="text" placeholder="Nombre Completo" />
                        </CFormGroup>
                        <CFormGroup>
                            <CInput id="email" type="email" placeholder="Correo electrónico" />
                        </CFormGroup>
                        <CFormGroup>
                            <CInput id="product" placeholder="Tu producto: ej. ropa, comida, etc" />
                        </CFormGroup>
                        <CFormGroup>
                            <CInput id="tel" type="tel" placeholder="Teléfono: 0000-0000" pattern="[0-9]{4}-[0-9]{4}" />
                        </CFormGroup>
                        <CFormGroup>
                            <CTextarea 
                                name="message" 
                                id="message" 
                                rows="4"
                                placeholder="Escribe tu mensaje" 
                            />
                        </CFormGroup>
                        <CFormGroup className="form-actions" style={{marginBottom: '0'}}>
                            <CRow className="justify-content-md-center item-buttons">
                                <CCol className="col-md-auto">
                                    <CButton className="button" type="submit" size="lg" color="secondary">Conectar</CButton>
                                </CCol>
                            </CRow>
                        </CFormGroup>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default SliderTracking


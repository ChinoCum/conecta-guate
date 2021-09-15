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
    CImg
  } from '@coreui/react'
  import { DocsLink } from 'src/reusable'
  import CIcon from '@coreui/icons-react'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'


function Sales(props) {
    return (
       <>
            <CRow className="home-sales">
                    <CCol lg="6">
                        <CRow 
                            className="align-items-center" 
                            style={{
                                width:'100%',
                                height: '90%',
                                marginRight: '0',
                                marginLeft: '0'
                            }}>
                            <CCol>
                            </CCol>
                            <CCol lg="9">
                                <CRow>
                                    <CCol>
                                        <h3 className="title">
                                            Aumenta <br/> tus ventas
                                        </h3>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="body">
                                        Con envios a toda Guate aumentarás tus 
                                        ventas. Además con nuestro marketplace
                                        automatizado llegarás a más personas.
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol className="cta">
                                        <CButton className="button" type="submit" size="lg" color="secondary">Ver más</CButton>
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol>
                            </CCol>
                        </CRow>
                    </CCol>
                    <CCol lg="6" className="sales-image-hero">
                        <CImg
                            src={"img/hero/office-background-blue.png"}
                            className="d-inline-block img-fluid"
                            alt="ventas conecta"
                        />
                    </CCol>
            </CRow>
       </>
    )
}

Sales.propTypes = {

}

export default Sales


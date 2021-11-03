import React, { lazy, Fragment, useState, useEffect, useRef} from 'react'
import {isMobile} from 'react-device-detect';
import {
    CBadge,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CProgress,
    CRow,
    CJumbotron,
    CImg
  } from '@coreui/react'

import VideoComponentCrossSelling from './VideoComponentCrossSelling';
import CIcon from '@coreui/icons-react';

function CrossSelling(props) {
    return (
        <>
            <div className="cross-selling-container">
                <CRow>
                    <CCol sm="12">
                        <CCard className="card-header">
                            <div className="cross-selling-title">
                                Tu marca llega mas lejos
                            </div>
                        </CCard>    
                    </CCol>
                </CRow>  
                <CRow>
                    <CCol sm="12" className="title">
                        Conectamos con más clientes
                    </CCol>
                    <CCol sm="12" className="description">
                        La herramienta de cross selling, es un beneficio que te brindamos con el fin de que puedas alcanzar más clientes a traves de los envíos de Conecta Guate.
                        <br/>
                        <br/>
                        Al contar con el plan Premium tienes acceso a publicar imágenes de tus productos más aclamados.
                    </CCol>
                </CRow>
                <VideoComponentCrossSelling />
                <CRow>
                    <CCol>
                        <CJumbotron className="border jumbotron-content">
                            <p className="lead">Empieza a disfrutar de los beneficios que ConectaGuate te 
                                ofrece, haz crecer tu negocio y hagamos que conectar Guatemala sea más fácil.</p>
                            <CRow>
                                <CCol >
                                    <CRow style={{float:'right'}}>
                                        <p className="lead plan">Cambiarme al plan</p>
                                        <CButton className="button-premium" color="primary" size="lg">
                                            <CImg 
                                                src={`img/icons/cross-selling/diamond.png`}
                                                className="diamond-button"
                                            />
                                            Premium
                                        </CButton>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CJumbotron>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}



export default CrossSelling


import React, { lazy, Fragment, useState, useEffect, useRef} from 'react'
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
    CCallout,
    CFormGroup,
    CLabel,
    CInput,
    CSwitch,
    CInputGroupAppend,
    CInputGroup,
    CInputGroupText,
    CContainer,
    CCollapse,
    CSelect
  } from '@coreui/react'

function NewPassword(props) {
    return (
        <>  
            <div className="profile-container">
                <CRow>
                    <CCol sm="12">
                        <div className="profile-title">
                            <h2>Cambio de contraseña</h2>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="12">
                        <CFormGroup>
                            <CLabel htmlFor="current_password">Contraseña Actual</CLabel>
                            <CInput id="current_password" type="password" placeholder="" required />
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="12">
                        <CFormGroup>
                            <CLabel htmlFor="new_password">Nueva Contraseña</CLabel>
                            <CInput id="new_password" type="password" placeholder="" required />
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="12">
                        <CFormGroup>
                            <CLabel htmlFor="confirm_new_password">Confirmar Nueva Contraseña</CLabel>
                            <CInput id="confirm_new_password" type="password" placeholder="" required />
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="6">
                        
                    </CCol>
                    <CCol sm="6">
                        <CRow>
                            <CCol sm="6" className="mb-3 mb-xl-0">
                                <CButton name="cancelar" block color="secondary">Cancelar</CButton>
                            </CCol>
                            <CCol sm="6" className="mb-3 mb-xl-0">
                                <CButton name="guardar" block color="info">Actualizar</CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}


export default NewPassword


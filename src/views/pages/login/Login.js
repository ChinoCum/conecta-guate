import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4" style={{border: '0px', background: '#ebedef'}}>
                <CCardBody>
                  <CForm>
                    <h1  className="text-center">Conecta</h1>
                    <p className="text-muted text-center">Iniciar Sesión</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username"  style={{background:'white', border: '0px'}}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" style={{background:'white', border: '0px'}}/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="8" className="text-left">
                        <CButton color="link" className="px-0">¿Olvidaste tu contraseña?</CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="12">
                        <CButton color="primary" className="px-12" style={{width: '100%', background:'#7979e7'}} to="/creacion-pedido">Continuar</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <div className="p-4">
                &nbsp;
              </div>
              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

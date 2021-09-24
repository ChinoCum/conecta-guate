import React, {Fragment, useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CImg,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {

  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const {id, value} = e.target;
    const form_object = JSON.parse(JSON.stringify(login));
    let new_data = {
        ...form_object,
        [id]: value
    };
    console.log(new_data);
    setLogin(new_data);
  }

  return (
    // <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer className="login-container">
        <CRow className="login-row">
          <CCol md="6" className="login-col">
            <CContainer>
              <CRow className="align-items-center login-panel">
                <CCardGroup className="login-left-panel">
                <CCard className="card-container" style={{border: '0px', background: '#ebedef'}}>
                  <CCardBody>
                    <CForm>
                      <CImg 
                          fluid
                          src={"img/logo_conecta.png"}
                          className="logo-img"
                      />
                      <p className="text-center subtitle">Iniciar Sesión</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-envelope-closed" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" id="username"  onChange={handleChange} value={login.username} placeholder="Tu correo electrónico" autoComplete="username"  style={{background:'white', border: '0px'}}/>
                      </CInputGroup>
                      <CInputGroup className="mb-1">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" id="password"  onChange={handleChange} value={login.password} placeholder="Tu contraseña" autoComplete="current-password" style={{background:'white', border: '0px'}}/>
                      </CInputGroup>
                      <CRow>
                        <CCol xs="12" className="text-left">
                          <CButton color="link" >¿Olvidaste tu contraseña?</CButton>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12">
                          <CButton color="primary" className="px-12" style={{width: '100%', background:'#7979e7'}} to="/creacion-pedido">Continuar</CButton>
                        </CCol>
                      </CRow>
                      {/* Separate */}
                      <CRow style={{
                            width:'100%', 
                            borderBottom:'2px solid #153b75',
                            marginBottom: '1rem',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                          }}>
                        &nbsp;
                      </CRow>

                      <CRow>
                        <CCol xs="12">
                          <CButton 
                            color="primary" 
                            className="px-12" 
                            style={{
                              width: '100%', 
                              background:'#143B74', 
                              border: '1px solid #143B74',
                              textAlign: 'left'
                            }} 
                            to="/creacion-pedido">
                              <CImg 
                                    className="social-icon-button"
                                    src="/img/icons/facebook.svg"
                                    onClick={()=>{
                                        window.open('https://www.facebook.com/ConectaGuateOficial/', '_blank').focus();
                                    }}
                                />
                              Iniciar Sesión con Facebook
                            </CButton>
                        </CCol>
                      </CRow>
                      <br/>
                      <CRow>
                        <CCol xs="12">
                          <CButton 
                            color="primary" 
                            className="px-12" 
                            style={{
                              width: '100%', 
                              background:'#D80514', 
                              border: '1px solid #D80514',
                              textAlign:'left'
                            }} 
                            to="/creacion-pedido">
                              <CImg 
                                    className="social-icon-button"
                                    src="/img/icons/google.svg"
                                    onClick={()=>{
                                        window.open('https://www.facebook.com/ConectaGuateOficial/', '_blank').focus();
                                    }}
                                />
                              Iniciar Sesión con Google
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
              </CRow>
            </CContainer>
          </CCol>
          <CCol md="6" className="login-col-right">
              <CContainer>
                  <CRow className="align-items-center login-card-right">
                    <CCardGroup className="login-right-panel">
                      <CCard className="p-4 card-container-right" style={{backgroundColor: 'white'}}>
                              <CRow className="image-card">
                                <CImg 
                                    className="img-card-info"
                                    src="/img/hero/card-info.jpg"
                                />
                              </CRow>
                      </CCard>
                    </CCardGroup>
                  </CRow>
              </CContainer>
          </CCol>
        </CRow>
      </CContainer>
    // </div>
  )
}

export default Login

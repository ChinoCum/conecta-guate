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
import { ToastProvider, useToasts } from 'react-toast-notifications';
import axios from 'axios';


const Register = () => {
  const { addToast } = useToasts();

  const [register, setRegister] = useState({
    name: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const {id, value} = e.target;
    const form_object = JSON.parse(JSON.stringify(register));
    let new_data = {
        ...form_object,
        [id]: value
    };
    console.log(new_data);
    setRegister(new_data);
  }

  const onSubmit = () =>{
    let error = false;
    let labels = {
      name: "Nombre",
      username: "Correo Electrónico",
      password: "Contraseña"
  };

    for (const [key, value] of Object.entries(register)) {
        if(value.length === 0){
            addToast(`El campo ${labels[key]} es requerido`, { 
                appearance: 'error', 
                autoDismiss : true ,
                autoDismissTimeout : 4000
            });
            error = true;
        }

        if(key === 'password' && value.length < 7){
          addToast(`La ${labels[key]} debe tener 7 caracteres como minimo`, { 
              appearance: 'error', 
              autoDismiss : true ,
              autoDismissTimeout : 4000
          });
          error = true;
      }
    }
    

    const em = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!em.test(String(register.username).toLowerCase())){
        addToast(`El Correo Electrónico no es valido`, { 
            appearance: 'error', 
            autoDismiss : true ,
            autoDismissTimeout : 4000
        });
        error = true;
    }

    if(error){
      return false;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ })
  };

  axios({
    method: 'post',
    url: 'https://ws.conectaguate.com/api/auth/signup',
    data: {
      ...register 
    }
  }).then(res => res.json())
  .then(
    (result) => {
      console.log(result);
      addToast(`Registro Exitoso`, { 
          appearance: 'success', 
          autoDismiss : true ,
          autoDismissTimeout : 4000
      });
      setRegister({
        name: "",
        username: "",
        password: ""
      })
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
      console.log(error);
    }
  );
    



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
                      <p className="text-center subtitle">Selecciona tu método de registro</p>
                      
                      <CRow className="mb-3">
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
                      <CRow className="mb-3">
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

                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" onChange={handleChange} placeholder="Tu Nombre" value={register.name} id="name"  style={{background:'white', border: '0px'}}/>
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-envelope-closed" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" onChange={handleChange} placeholder="Tu correo electrónico" value={register.username} id="username"  style={{background:'white', border: '0px'}}/>
                      </CInputGroup>
                      
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" onChange={handleChange} placeholder="Tu contraseña" value={register.password} id="password" style={{background:'white', border: '0px'}}/>
                      </CInputGroup>
                      <CRow  className="mb-3">
                        <CCol xs="12">
                          <CButton color="primary" className="px-12" style={{width: '100%', background:'#7979e7'}} onClick={onSubmit}>Registrarme gratis</CButton>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12" className="text-left">
                          ¿Ya usas Conecta Guate? <CButton color="link" style={{paddingLeft: '3px'}}>Iniciar sesión</CButton>
                        </CCol>
                      </CRow>
                      <CRow>
                        <CCol xs="12" className="text-center">
                              Al continuar aceptas nuestros
                        </CCol>
                        <CCol xs="12" className="text-center">
                          <CButton className="left-button" color="link">Terminos y Condiciones</CButton>y<CButton className="right-button" color="link" >Politicas de privacidad</CButton>
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

export default Register

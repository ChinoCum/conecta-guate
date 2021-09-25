import React, {Fragment, useState, useEffect} from 'react'
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
import { useHistory } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import axios from 'axios';

const Login = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  useEffect(()=>{
    const user = reactLocalStorage.getObject('user');

    if(Object.keys(user).length > 0){
      console.log(user);
      if(user !== 'undefined' && user !== undefined && user !== null){
        console.log('teeeeeeeeest');
        if(user.token.length > 0){
          history.push('/creacion-pedido');
        }
      }
   }
  },[])

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

  const onSubmit = () =>{
    let error = false;
    let labels = {
      username: "Correo Electrónico",
      password: "Contraseña"
  };

    for (const [key, value] of Object.entries(login)) {
        if(value.length === 0){
            addToast(`El campo ${labels[key]} es requerido`, { 
                appearance: 'error', 
                autoDismiss : true ,
                autoDismissTimeout : 4000
            });
            error = true;
        }
    }

    const em = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!em.test(String(login.username).toLowerCase())){
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

    let object_login = {
      email: login.username,
      password: login.password,
      remember_me: true
    }

    axios({
      method: 'post',
      url: 'https://ws.conectaguate.com/api/auth/login',
      data: object_login,
      headers: {"Access-Control-Allow-Origin": "*"}
    }).then(
      (result) => {
        console.log(result);
        addToast(`Login Exitoso`, { 
            appearance: 'success', 
            autoDismiss : true ,
            autoDismissTimeout : 4000
        });
        reactLocalStorage.setObject('user', {
          'email': login.username,
          'token': result.data.access_token
        });

        setLogin({
          username: "",
          password: ""
        })

        history.push('/creacion-pedido');
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        if (error.response) {
          console.log(error.response);
          addToast(`Usuario o Contraseña incorrectos`, { 
              appearance: 'error', 
              autoDismiss : true ,
              autoDismissTimeout : 4000
          });
        }
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
                          <CButton color="primary" className="px-12" style={{width: '100%', background:'#7979e7'}} onClick={onSubmit}>Continuar</CButton>
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
                      <CRow>
                        <CCol xs="12" className="text-left">
                          ¿No tienes cuenta? <CButton color="link" style={{paddingLeft: '3px'}} to="/register">Registrate</CButton>
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

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
  import { ToastProvider, useToasts } from 'react-toast-notifications';
  import { v4 as uuidv4 } from 'uuid';
  import axios from 'axios';
  import { 
      useHistory,
      useRouteMatch,
      useParams
  } from "react-router-dom";

function Profile(props) {
    const history = useHistory();
    const { addToast } = useToasts();
    const [render_days, setRenderDays] = useState([]);
    const inputFile = useRef(null) 

    const [profile, setProfile] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        dpi: "",
        fecha_nacimiento_day: "1",
        fecha_nacimiento_month: "1",
        fecha_nacimiento_year: "2017",
        nombre_tienda: "",
        nit: "",
        tipo_de_producto: "",
        logo: [],
        direccion_de_recolecta: "",
        poblado_municipio: "",
        nombre_de_cuenta: "",
        numero_de_cuenta: "",
        tipo_de_cuenta: "",
        nombre_banco: ""
    });


    const onClick = () =>{ 
        let labels = {
            nombre: "Nombre",
            apellido: "Apellido",
            telefono: "Telefono",
            email: "Correo Electronico",
            dpi: "DPI",
            fecha_nacimiento_day: "Dia",
            fecha_nacimiento_month: "Mes",
            fecha_nacimiento_year: "Año",
            nombre_tienda: "Nombre de la tienda/empresa",
            nit: "Nit",
            tipo_de_producto: "Tipo de producto",
            logo: [],
            direccion_de_recolecta: "Dirección de Recolecta",
            poblado_municipio: "Poblado/Municipio",
            nombre_de_cuenta: "Nombre de la cuenta",
            numero_de_cuenta: "Numero de cuenta",
            tipo_de_cuenta: "Tipo de cuenta",
            nombre_banco: "Nombre de Banco"
        };

        let allow = true;
        for (const [key, value] of Object.entries(profile)) {
            if(key in labels && value.length === 0){
                addToast(`El campo ${labels[key]} es requerido`, { 
                    appearance: 'error', 
                    autoDismiss : true ,
                    autoDismissTimeout : 4000
                });
                allow = false;
            }

            const em = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(key === 'email'){
                if(!em.test(String(value).toLowerCase())){
                    addToast(`El ${labels[key]} no es valido`, { 
                        appearance: 'error', 
                        autoDismiss : true ,
                        autoDismissTimeout : 4000
                    });
                    allow = false;
                }
            }
            if(key === 'dpi'){
                if(value.trim().length !== 13){
                    addToast(`El dpi no es valido`, { 
                        appearance: 'error', 
                        autoDismiss : true ,
                        autoDismissTimeout : 4000
                    });
                    allow = false;
                }
            }
        }
        return allow;
    }

   

    const handleChange = (e) => {
        const {id, value} = e.target;
        let data_copy = JSON.parse(JSON.stringify(profile));
        data_copy = {
            ...data_copy,
            [id]: value 
        }
        setProfile(data_copy);
        console.log(data_copy);
    }

    useEffect(()=>{
        let number_of_days = 0;
        let render = [];
        switch(profile.fecha_nacimiento_month){
            case "1":
                number_of_days = 31;
                break;
            case "2":
                number_of_days = 28;
                break;
            case "3":
                number_of_days = 31;
                break;
            case "4":
                number_of_days = 30;
                break;
            case "5":
                number_of_days = 31;
                break;
            case "6":
                number_of_days = 30;
                break;
            case "7":
                number_of_days = 31;
                break;
            case "8":
                number_of_days = 30;
                break;
            case "9":
                number_of_days = 31;
                break;
            case "10":
                number_of_days = 30;
                break;
            case "11":
                number_of_days = 31;
                break;
            case "12":
                number_of_days = 30;
                break;
            default:
                number_of_days = 31;
        }

        for(let i = 2; i < number_of_days+1; i++){
            render.push(<option value="1">1</option>);
        }
        setRenderDays(render);
    }, []);

    useEffect(()=>{
        let number_of_days = 0;
        let render = [];
        switch(profile.fecha_nacimiento_month){
            case "1":
                number_of_days = 31;
                break;
            case "2":
                number_of_days = 28;
                break;
            case "3":
                number_of_days = 31;
                break;
            case "4":
                number_of_days = 30;
                break;
            case "5":
                number_of_days = 31;
                break;
            case "6":
                number_of_days = 30;
                break;
            case "7":
                number_of_days = 31;
                break;
            case "8":
                number_of_days = 30;
                break;
            case "9":
                number_of_days = 31;
                break;
            case "10":
                number_of_days = 30;
                break;
            case "11":
                number_of_days = 31;
                break;
            case "12":
                number_of_days = 30;
                break;
            default:
                number_of_days = 31;
        }

        for(let i = 2; i < number_of_days+1; i++){
            render.push(<option key={`key_op_${i}`} value={i}>{i}</option>);
        }
        setRenderDays(render);
    }, [profile.fecha_nacimiento_month]);

    return (
        <>  
            <div className="profile-container">
                <CRow>
                    <CCol sm="12">
                        <div className="profile-title">
                            <h2>Perfil</h2>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="6">
                        <CFormGroup>
                            <CLabel htmlFor="Nombre">Nombre</CLabel>
                            <CInput id="nombre" onChange={handleChange} value={profile.nombre} placeholder="" required />
                        </CFormGroup>
                    </CCol>
                    <CCol sm="6">
                        <CFormGroup>
                            <CLabel htmlFor="Apellido">Apellido</CLabel>
                            <CInput id="apellido" onChange={handleChange} value={profile.apellido}  placeholder="" required />
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="4">
                        <CFormGroup>
                            <CLabel htmlFor="Telefono">Telefono</CLabel>
                            <CInput id="telefono" onChange={handleChange} value={profile.telefono} placeholder="" required />
                        </CFormGroup>
                    </CCol>
                    <CCol sm="8">
                        <CFormGroup>
                            <CLabel htmlFor="email">Correo Electronico</CLabel>
                            <CInput id="email" onChange={handleChange} value={profile.email} placeholder="" required />
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="4">
                        <CFormGroup>
                            <CLabel htmlFor="DPI">No. DPI</CLabel>
                            <CInput id="dpi" onChange={handleChange} value={profile.dpi} placeholder="" required />
                        </CFormGroup>
                    </CCol>
                    <CCol sm="8">
                        <CFormGroup>
                            <CLabel htmlFor="fecha-de-nacimiento">Fecha de Nacimiento</CLabel>
                            <CRow>
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CSelect onChange={handleChange} value={profile.fecha_nacimiento_day} custom name="fecha_nacimiento_day" id="fecha_nacimiento_day">
                                            <option value="1">1</option>
                                            {render_days}
                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CSelect onChange={handleChange} value={profile.fecha_nacimiento_month} custom name="fecha_nacimiento_month" id="fecha_nacimiento_month">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="4">
                                    <CFormGroup>
                                        <CSelect onChange={handleChange} value={profile.fecha_nacimiento_year} custom name="fecha_nacimiento_year" id="fecha_nacimiento_year">
                                        <option value="1920">1920</option>
                                        <option value="1921">1921</option>
                                        <option value="1922">1922</option>
                                        <option value="1923">1923</option>
                                        <option value="1924">1924</option>
                                        <option value="1925">1925</option>
                                        <option value="1926">1926</option>
                                        <option value="1927">1927</option>
                                        <option value="1928">1928</option>
                                        <option value="1929">1929</option>
                                        <option value="1930">1930</option>
                                        <option value="1931">1931</option>
                                        <option value="1932">1932</option>
                                        <option value="1933">1933</option>
                                        <option value="1934">1934</option>
                                        <option value="1935">1935</option>
                                        <option value="1936">1936</option>
                                        <option value="1937">1937</option>
                                        <option value="1938">1938</option>
                                        <option value="1939">1939</option>
                                        <option value="1940">1940</option>
                                        <option value="1941">1941</option>
                                        <option value="1942">1942</option>
                                        <option value="1943">1943</option>
                                        <option value="1944">1944</option>
                                        <option value="1945">1945</option>
                                        <option value="1946">1946</option>
                                        <option value="1947">1947</option>
                                        <option value="1948">1948</option>
                                        <option value="1949">1949</option>
                                        <option value="1950">1950</option>
                                        <option value="1951">1951</option>
                                        <option value="1952">1952</option>
                                        <option value="1953">1953</option>
                                        <option value="1954">1954</option>
                                        <option value="1955">1955</option>
                                        <option value="1956">1956</option>
                                        <option value="1957">1957</option>
                                        <option value="1958">1958</option>
                                        <option value="1959">1959</option>
                                        <option value="1960">1960</option>
                                        <option value="1961">1961</option>
                                        <option value="1962">1962</option>
                                        <option value="1963">1963</option>
                                        <option value="1964">1964</option>
                                        <option value="1965">1965</option>
                                        <option value="1966">1966</option>
                                        <option value="1967">1967</option>
                                        <option value="1968">1968</option>
                                        <option value="1969">1969</option>
                                        <option value="1970">1970</option>
                                        <option value="1971">1971</option>
                                        <option value="1972">1972</option>
                                        <option value="1973">1973</option>
                                        <option value="1974">1974</option>
                                        <option value="1975">1975</option>
                                        <option value="1976">1976</option>
                                        <option value="1977">1977</option>
                                        <option value="1978">1978</option>
                                        <option value="1979">1979</option>
                                        <option value="1980">1980</option>
                                        <option value="1981">1981</option>
                                        <option value="1982">1982</option>
                                        <option value="1983">1983</option>
                                        <option value="1984">1984</option>
                                        <option value="1985">1985</option>
                                        <option value="1986">1986</option>
                                        <option value="1987">1987</option>
                                        <option value="1988">1988</option>
                                        <option value="1989">1989</option>
                                        <option value="1990">1990</option>
                                        <option value="1991">1991</option>
                                        <option value="1992">1992</option>
                                        <option value="1993">1993</option>
                                        <option value="1994">1994</option>
                                        <option value="1995">1995</option>
                                        <option value="1996">1996</option>
                                        <option value="1997">1997</option>
                                        <option value="1998">1998</option>
                                        <option value="1999">1999</option>
                                        <option value="2000">2000</option>
                                        <option value="2001">2001</option>
                                        <option value="2002">2002</option>
                                        <option value="2003">2003</option>
                                        <option value="2004">2004</option>
                                        <option value="2005">2005</option>
                                        <option value="2006">2006</option>
                                        <option value="2007">2007</option>
                                        <option value="2008">2008</option>
                                        <option value="2009">2009</option>
                                        <option value="2010">2010</option>
                                        <option value="2011">2011</option>
                                        <option value="2012">2012</option>
                                        <option value="2013">2013</option>
                                        <option value="2014">2014</option>
                                        <option value="2015">2015</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        </CSelect>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="8">
                        <CFormGroup>
                            <CLabel htmlFor="nombre_tienda">Nombre de tienda / empresa</CLabel>
                            <CInput onChange={handleChange} value={profile.nombre_tienda} id="nombre_tienda" placeholder="" required />
                        </CFormGroup>
                    </CCol>
                    <CCol sm="4">
                        <CFormGroup>
                            <CLabel htmlFor="nit">No. de NIT</CLabel>
                            <CInput onChange={handleChange} value={profile.nit} id="nit" placeholder="" required />
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="5">
                        <CFormGroup>
                            <CLabel htmlFor="tipo_de_producto">Tipo de producto a la venta</CLabel>
                            <CFormGroup>
                                <CSelect onChange={handleChange} value={profile.tipo_de_producto} custom name="tipo_de_producto" id="tipo-de-producto">
                                    <option>Ropa y Accesorios</option>
                                </CSelect>
                            </CFormGroup>
                        </CFormGroup>
                    </CCol>
                    <CCol sm="7">
                        <CFormGroup>
                            <CLabel htmlFor="logo">Logo de tienda / empresa</CLabel>
                            <CRow>
                                <CCol sm="4" className="mb-3 mb-xl-0">
                                    <CButton name="logo-button" block color="secondary"
                                     onClick={() => {
                                        // `current` points to the mounted file input element
                                       inputFile.current.click();
                                    }}
                                    >Cargar logo</CButton>
                                    <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
                                </CCol>
                                <CCol sm="7" className="mb-3 mb-xl-0">
                                    El archivo no debe exceder de 2mb, jpg, png
                                </CCol>
                            </CRow>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="12">
                        <CFormGroup>
                            <CLabel htmlFor="direccion_de_recolecta">Dirección de recolecta</CLabel>
                            <CInput onChange={handleChange} value={profile.direccion_de_recolecta} id="direccion_de_recolecta" placeholder="" required />
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="9">
                        <CFormGroup>
                        <   CLabel htmlFor="poblado_municipio">Poblado / Municipio</CLabel>
                            <CInput onChange={handleChange} value={profile.poblado_municipio} id="poblado_municipio" placeholder="" required />
                        </CFormGroup>
                    </CCol>
                    <CCol sm="3">
                        <CLabel htmlFor="ubicacion">Compartir ubicación</CLabel>
                        <CRow className="switch-container">          
                            <label className="switch">
                                <input type="checkbox" id="efectivo-pago" />
                                <div className="slider round">
                                <span className="on">Si</span>
                                <span className="off">no</span>
                                </div>
                            </label>
                        </CRow>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="12">
                        <CFormGroup>
                            <CLabel htmlFor="nombre_de_cuenta">Datos de cuenta de depósito por mis ventas</CLabel>
                            <CInput onChange={handleChange} value={profile.nombre_de_cuenta} id="nombre_de_cuenta" placeholder="" required />
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm="4">
                        <CFormGroup>
                            <CInput onChange={handleChange} value={profile.numero_de_cuenta} id="numero_de_cuenta" placeholder="No. de cuenta" required />
                        </CFormGroup>
                    </CCol>
                    <CCol sm="4">
                        <CFormGroup>
                            <CSelect onChange={handleChange} custom name="tipo_de_cuenta" value={profile.numero_de_cuenta} id="tipo_de_cuenta">
                                <option value="Monetaria">Monetaria</option>
                                <option value="Ahorro">Ahorro</option>
                            </CSelect>
                        </CFormGroup>
                    </CCol>
                    <CCol sm="4">
                        <CFormGroup>
                            <CSelect onChange={handleChange} custom name="nombre_banco" id="nombre_banco" value={profile.nombre_banco}>
                                <option value="">Banco</option>
                                <option value="Banco Industrial">Banco Industrial</option>
                            </CSelect>
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
                                <CButton onClick={onClick} name="guardar" block color="info">Guardar Perfil</CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
                
            </div>
        </>
    )
}

export default Profile


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
  import {reactLocalStorage} from 'reactjs-localstorage';

function Profile(props) {
    const history = useHistory();
    const { addToast } = useToasts();
    const [render_days, setRenderDays] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [location, setLocation] = useState({
        full_location: "",
        lat: "0",
        long: "0"
    });
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
        tipo_producto: "",
        logo: [],
        direccion_de_recolecta: "",
        departamento: "",
        municipio: "",
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
            tipo_producto: "Tipo de producto",
            // logo: [],
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

        if(allow){
            addUserInfo();
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

    const ifNotNull = (data) =>{
        if(data !== null){
            return data;
        }
        return "";
    }

    useEffect(()=>{
        const user_object = reactLocalStorage.getObject('user');
        let bearer = "";
        console.log(user_object);

        if(user_object === 'undefined' || user_object === undefined || user_object === null || Object.keys(user_object).length === 0){
            reactLocalStorage.remove('user');
            history.push('/login');
        }else{  
            bearer =  `Bearer ${user_object.token}`;
        }   

        const config = {
            headers: { 
                "Authorization": bearer
            }
        };

        axios.get(
            'https://ws.conectaguate.com/api/v1/site/usuario/information',
            config
        ).then((response)=>{
            
            let data_usuario = response.data.usuario;
            if(data_usuario === null) return false;
            console.log(response)

            if(ifNotNull(data_usuario.fecha_nacimiento)){
                data_usuario.fecha_nacimiento_day =  data_usuario.fecha_nacimiento.substring(8,10);
                data_usuario.fecha_nacimiento_month =  data_usuario.fecha_nacimiento.substring(5,7) 
                data_usuario.fecha_nacimiento_year =  data_usuario.fecha_nacimiento.substring(0,4) 
                if(parseInt(data_usuario.fecha_nacimiento_day) < 10){
                    data_usuario.fecha_nacimiento_day =  data_usuario.fecha_nacimiento_day.replace('0','');
                }   
                if(parseInt(data_usuario.fecha_nacimiento_month) < 10){
                    data_usuario.fecha_nacimiento_month =  data_usuario.fecha_nacimiento_month.replace('0','');
                }   
            }

            if(ifNotNull(data_usuario.lon) && ifNotNull(data_usuario.lat)){
                setLocation({
                    full_location: `Longitute = ${data_usuario.lon} \n latitude = ${data_usuario.lat}`,
                    lat: data_usuario.lat,
                    long: data_usuario.lon
                })
            }

            setProfile({
                ...profile,
                ...data_usuario,
                telefono: data_usuario.phone,
                nombre_tienda: data_usuario.empresa,
                direccion_de_recolecta: data_usuario.direccion_recoleccion,
                nombre_de_cuenta: data_usuario.cuenta_nombre,
                nombre_banco: data_usuario.cuenta_banco,
                numero_de_cuenta: data_usuario.cuenta_numero,
                tipo_de_cuenta: data_usuario.cuenta_tipo,
                tipo_producto: data_usuario.tipo_producto
            })
        });
    },[]);

    useEffect(()=>{
        console.log("Profile", profile);
    },[profile])

    const addUserInfo = () =>{
        const user_object = reactLocalStorage.getObject('user');
        console.log(`Bearer ${user_object.token}`);
        const config = {
            headers: { 
                'Authorization': `Bearer ${user_object.token}`,
                'Content-Type': 'application/json'
            }
        };

        let mes = (parseInt(profile.fecha_nacimiento_month) < 10) ? "0"+profile.fecha_nacimiento_month : profile.fecha_nacimiento_month;
        let dia = (parseInt(profile.fecha_nacimiento_day) < 10) ? "0"+profile.fecha_nacimiento_day : profile.fecha_nacimiento_day;

        const data_body = {
            nombre: profile.nombre,
            apellido: profile.apellido,
            phone: profile.telefono,
            email: profile.email,
            dpi: profile.dpi,
            fecha_nacimiento: `${profile.fecha_nacimiento_year}-${mes}-${dia}`,
            empresa: profile.nombre_tienda,
            nit: profile.nit,
            tipo_producto: profile.tipo_producto,
            direccion_recoleccion: profile.direccion_de_recolecta,
            departamento: profile.departamento,
            municipio: profile.municipio,
            location: false,
            lat: location.lat,
            lon: location.long,
            cuenta_nombre: profile.nombre_de_cuenta,
            cuenta_numero: profile.numero_de_cuenta,
            cuenta_tipo: profile.tipo_de_cuenta,
            cuenta_banco: profile.nombre_banco,
        }

        console.log(data_body);
    
        axios({
            method: 'post',
            url: 'https://ws.conectaguate.com/api/v1/site/usuario/information/create',
            headers: { 
                'Authorization': `Bearer ${user_object.token}`,
                'Content-Type': 'application/json'
            },
            data: data_body
        }).then(
        (result) => {
            addToast(`Informacion guardada exitosamente`, { 
                appearance: 'success', 
                autoDismiss : true ,
                autoDismissTimeout : 4000
            });
            console.log(result);
        },
        (error) => {
            if (error.response) {
                addToast(`${error.response}`, { 
                    appearance: 'error', 
                    autoDismiss : true ,
                    autoDismissTimeout : 4000
                });
                console.log(error.response);
            }
        });

    }


    useEffect(()=>{
        const user_object = reactLocalStorage.getObject('user');
        console.log(user_object);
        if(user_object === 'undefined' || user_object === undefined || user_object === null || Object.keys(user_object).length === 0){
            history.push('/login');
        }else{
            const config = {
                headers: { Authorization: `Bearer ${user_object.token}` }
            };
        
            axios.get(
            'https://ws.conectaguate.com/api/v1/site/departamentos/',
            config,
            ).then(
            (result) => {
                const departamentos_response = result.data.Data;
                setDepartamentos(departamentos_response);
                console.log(departamentos_response);
            },
            (error) => {
                if (error.response) {
                console.log(error.response);
                }
            });

            axios.get(
                'https://ws.conectaguate.com/api/v1/site/municipios/',
                config,
                ).then(
                (result) => {
                    const municipios_response = result.data.Data;
                    setMunicipios(municipios_response);
                    console.log(municipios_response);
                },
                (error) => {
                    if (error.response) {
                    console.log(error.response);
                    }
                });
        }
    },[])

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

    //  Testing get location
    let current_location = document.getElementById("location");
    const success = (position) => {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    setLocation({
        full_location: `Longitute = ${longitude} \n latitude = ${latitude}`,
        lat: latitude,
        long: longitude
    });
    setProfile({
        ...profile,
        lat: latitude,
        lon: longitude
    })
    current_location.textContent = `Longitute = ${longitude} \n latitude = ${latitude}`;
    }
    const error = (error) => {
        current_location.textContent = `Couldn't access your location \n Reason: ${error.message}`;
    }
    const getLocation = () => {
        console.log(location.long);
        console.log(location.lat);
        console.log(location.long === "0" && location.lat === "0");
        if(location.long === "0" && location.lat === "0"){
            if(navigator.geolocation)
                navigator.geolocation.getCurrentPosition(success,error);
            else 
                current_location.textContent = `Your browser does not support this feature`;
        }else{
            setLocation({
                full_location: ``,
                lat: "0",
                long: "0"
            });
            setProfile({
                ...profile,
                lat: "0",
                lon: "0"
            })
        }
    }

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
                            <CLabel htmlFor="tipo_producto">Tipo de producto a la venta</CLabel>
                            <CFormGroup>
                                <CSelect onChange={handleChange} value={profile.tipo_producto} custom name="tipo_producto" id="tipo_producto">
                                    <option value="Ropa y Accesorios">Ropa y Accesorios</option>
                                    <option value="Alquileres">Alquileres</option>
                                    <option value="Electronica">Electronica</option>
                                    <option value="Salud y Belleza">Salud y Belleza</option>
                                    <option value="Bebes y Niños">Bebes y Niños</option>
                                    <option value="Autopartes">Autopartes</option>
                                    <option value="Casas y Jardines">Casas y Jardines</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Otros">Otros</option>
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
                    <CCol sm="4">
                        <CFormGroup>
                            <CLabel htmlFor="departamento">Departamento</CLabel>
                            <CFormGroup>
                                <CSelect onChange={handleChange} value={profile.departamento} custom name="departamento" id="departamento">
                                    <option></option>
                                    {departamentos.map((elem)=>{
                                        return <option key={elem.id} value={elem.nombre}>{elem.nombre}</option>
                                    })}
                                </CSelect>
                            </CFormGroup>
                        </CFormGroup>
                    </CCol>
                    <CCol sm="4">
                        <CFormGroup>
                            <CLabel htmlFor="municipio">Municipio</CLabel>
                            <CFormGroup>
                                <CSelect onChange={handleChange} value={profile.municipio} custom name="municipio" id="municipio">
                                    <option></option>
                                    {municipios.map((elem)=>{
                                        return <option key={elem.id} value={elem.nombre}>{elem.nombre}</option>
                                    })}
                                </CSelect>
                            </CFormGroup>
                        </CFormGroup>
                    </CCol>
                    <CCol sm="4">
                        <CLabel htmlFor="ubicacion">Compartir ubicación</CLabel>
                        <CRow className="switch-container">          
                            <label className="switch">
                                <input type="checkbox" id="ubicacion" onChange={getLocation} checked={(location.lat !== "0" && location.long !== "0") ? true : false}/>
                                <div className="slider round">
                                <span className="on">Si</span>
                                <span className="off">no</span>
                                </div>
                            </label>
                            <div id = "location">{(location.lat !== "0" && location.long !== "0") ? `Longitute = ${location.long} \n latitude = ${location.lat}` : ''}</div>
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
                            <CSelect onChange={handleChange} custom name="tipo_de_cuenta" value={profile.tipo_de_cuenta} id="tipo_de_cuenta">
                                <option value="Monetaria">Monetaria</option>
                                <option value="Ahorro">Ahorro</option>
                            </CSelect>
                        </CFormGroup>
                    </CCol>
                    <CCol sm="4">
                        <CFormGroup>
                            <CSelect onChange={handleChange} custom name="nombre_banco" id="nombre_banco" value={profile.nombre_banco}>
                                <option value="">Banco</option>
                                <option value="Banco Agromercantil de Guatemala, S.A.">Banco Agromercantil de Guatemala, S.A.</option>
                                <option value="BAC Credomatic International Bank">BAC Credomatic International Bank</option>
                                <option value="Banco Azteca de Guatemala, S.A.">Banco Azteca de Guatemala, S.A.</option>
                                <option value="Banco Credicorp S.A.">Banco Credicorp S.A.</option>
                                <option value="Banco G&T Continental, S.A.">Banco G&T Continental, S.A.</option>
                                <option value="Banco INV, S.A.">Banco INV, S.A.</option>
                                <option value="Banco Industrial, S.A.">Banco Industrial, S.A.</option>
                                <option value="Banco Inmobiliario, S.A.">Banco Inmobiliario, S.A.</option>
                                <option value="Banco Internacional, S.A.">Banco Internacional, S.A.</option>
                                <option value="Banco Promerica">Banco Promerica</option>
                                <option value="Banco de Antigua S.A">Banco de Antigua S.A</option>
                                <option value="Banco de Desarrollo Rural, S.A.">Banco de Desarrollo Rural, S.A.</option>
                                <option value="Banco de Guatemala">Banco de Guatemala</option>
                                <option value="Banco de los trabajadores">Banco de los trabajadores</option>
                                <option value="Citibank NA">Citibank NA</option>
                                <option value="El Crédito Hipotecario Nacional de Guatemala">El Crédito Hipotecario Nacional de Guatemala</option>
                                <option value="Ficohsa Guatemala S.A. / Banco Americano S.A.">Ficohsa Guatemala S.A. / Banco Americano S.A.</option>
                                <option value="Vivibanco">Vivibanco</option>
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


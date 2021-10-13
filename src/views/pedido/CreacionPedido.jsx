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
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {reactLocalStorage} from 'reactjs-localstorage';
import MainChartExample from '../charts/MainChartExample.js'
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { 
    useHistory,
    useRouteMatch,
    useParams
} from "react-router-dom";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))



const CreacionPedido = () => {
    const history = useHistory();
    const { addToast } = useToasts();
    const [step, setStep] = useState(3);
    const [rows_data, setRowsData] = useState([]);
    const [data, setData] = useState({
        remitente: "",
        nombre_empresa_remitente: "",
        telefono_remitente: "",
        correo_remitente: "",
        municipio_remitente: "",
        direccion_remitente: "",
        destinatario: "",
        name_destinatario: "",
        telefono_destinatario: "",
        correo_destinatario: "",
        municipio_destinatario: "",
        direccion_destinatario: "",
        referencias_destinatario: ""
    });
    const [user, setUser] = useState({});
    const [seguro_value, setSeguroValue] = useState(0);
    const [cupon_value, setCuponValue] = useState(0);
    const [cod_value, setCodValue] = useState(0);


    useEffect(()=>{
        const user_object = reactLocalStorage.getObject('user');
        console.log(user_object);
        if(user_object === 'undefined' || user_object === undefined || user_object === null || Object.keys(user_object).length === 0){
            history.push('/login');
        }else{
          if(!('name' in user_object)){
              console.log(user_object);
              const config = {
                  headers: { Authorization: `Bearer ${user_object.token}` }
              };
            
              axios.get(
                'https://ws.conectaguate.com/api/auth/user',
                config,
              ).then(
                (result) => {
                  setUser({
                    ...user_object,
                    name: result.data.name
                  });
                  reactLocalStorage.setObject('user', { 
                    ...user_object,
                    name: result.data.name
                  });
                  console.log("data user", result);
                },
                (error) => {
                  if (error.response) {
                    console.log(error.response);
                  }
              });
          }else{
            setUser({
              ...user_object
            });
          }
        }
      },[])

    useEffect(()=>{
        if(user){
            if(user.email === 'test010@gmail.com'){
                let new_data = {
                    correo_remitente: "chinocum@gmail.com",
                    direccion_remitente: "2 calle 38-61 zona 11",
                    municipio_remitente: "Guatemala",
                    nombre_empresa_remitente: "Test",
                    remitente: "Diego Cum",
                    telefono_remitente: "12345678"
                }
                setData({...data, ...new_data});
            }
        }
    }, [user])

    const handleChange = (e) => {
        const {id, value} = e.target;
        let data_copy = JSON.parse(JSON.stringify(data));
        data_copy = {
            ...data_copy,
            [id]: value 
        }
        setData(data_copy);
    }
    
    const nextStep = (step) =>{
        let allow = true;
        if(step === 1 && data.remitente !== 'testmode'){
            let labels = {
                remitente: "¿Quién envia?",
                telefono_remitente: "Teléfono (Remitente)",
                correo_remitente: "Correo Electronico (Remitente)",
                municipio_remitente: "Municipio (Remitente)",
                direccion_remitente: "Direccion (Remitente)",
                destinatario: "Destinatario",
                name_destinatario: "¿Quién recibe?",
                telefono_destinatario: "Teléfono (Destinatario)",
                correo_destinatario: "Correo Electronico (Destinatario)",
                municipio_destinatario: "Municipio (Destinatario)",
                direccion_destinatario: "Dirección (Destinatario)",
            };
          
            for (const [key, value] of Object.entries(data)) {
                if(key in labels && value.length === 0){
                    addToast(`El campo ${labels[key]} es requerido`, { 
                        appearance: 'error', 
                        autoDismiss : true ,
                        autoDismissTimeout : 4000
                    });
                    allow = false;
                }

                const em = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(key === 'correo_remitente' || key === 'correo_destinatario'){
                    if(!em.test(String(value).toLowerCase())){
                        addToast(`El ${labels[key]} no es valido`, { 
                            appearance: 'error', 
                            autoDismiss : true ,
                            autoDismissTimeout : 4000
                        });
                        allow = false;
                    }
                }
            }
        }

        if(data.remitente === 'testmode'){
            allow = true;
        }

        return allow;
    }

  return (
      (user)?
    <div className="creacion-pedido">
        {(step === 0) ? 
        <Step1 
            changeStep={setStep} 
            data={data} 
            handleChange={handleChange} 
            user={user} 
            checkNextStep={nextStep} 
        />
         : 
         (step === 1) ? 
         <Step2 
            changeStep={setStep} 
            addToast={addToast} 
            rows_data={rows_data}
            setRowsData={setRowsData} 
            cod={cod_value}
            cupon={cupon_value}
            seguro={seguro_value}
            setCod={setCodValue}
            setCupon={setCuponValue}
            setSeguro={setSeguroValue}
        />
         :  (step === 2) ? 
         <Step3 
            changeStep={setStep} 
            data={data} 
            rows_data={rows_data}
            handleChange={handleChange} 
            user={user} 
            checkNextStep={nextStep} 
        />: 
        <Step4 
           changeStep={setStep} 
           data={data} 
           rows_data={rows_data}
           handleChange={handleChange} 
           user={user} 
           checkNextStep={nextStep} 
       />}
    </div>:null
  )
}


const Step1 = (props) => {
    return (
        <>
            <div className="creacion-pedido-progress-bar">
                <CRow>
                    <CCol sm="9">
                    </CCol>
                    <CCol sm="3">
                        <div  className="wrap">
                            <ul id="progressbar">
                                <li className="active" id="first"><strong></strong></li>
                                <li id="second"><strong></strong></li>
                                <li id="third"><strong></strong></li>
                            </ul>
                        </div>
                    </CCol>
                </CRow>
            </div>

            <CCard className="creacion-pedido-card">
                <CCardBody className="card-body">
                    <CRow>
                        <CCol sm="5">
                            <div className="card-title">
                                <h3>Remitente</h3>
                            </div>
                        </CCol>
                    </CRow>
                    {/* // MARK: Origen */}
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">¿Quién envia?</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.remitente} onChange={props.handleChange} className="card-input" id="remitente" data-end="t" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Nombre de empresa</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.nombre_empresa_remitente} onChange={props.handleChange} className="card-input" id="nombre_empresa_remitente" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Teléfono</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.telefono_remitente} onChange={props.handleChange} className="card-input" id="telefono_remitente" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Correo electrónico</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.correo_remitente} onChange={props.handleChange} className="card-input" id="correo_remitente" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Poblado/Municipio</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.municipio_remitente}  onChange={props.handleChange} className="card-input" id="municipio_remitente" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Dirección</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.direccion_remitente} onChange={props.handleChange} className="card-input" id="direccion_remitente" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <br/>
            <CCard className="creacion-pedido-card">
                <CCardBody className="card-body">
                    <CRow>
                        <CCol sm="5">
                            <div className="card-title">
                                <h3>Destinatario</h3>
                            </div>
                        </CCol>
                    </CRow>
                    {/* // MARK: Origen */}
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row> 
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">¿Quién recibe?</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.destinatario} onChange={props.handleChange} className="card-input" id="destinatario" data-end="t" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Nombre de contacto</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput  value={props.data.name_destinatario} onChange={props.handleChange} className="card-input" id="name_destinatario" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Teléfono</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.telefono_destinatario} onChange={props.handleChange} className="card-input" id="telefono_destinatario" placeholder="" required />
                                </CCol>   
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Correo electrónico</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.correo_destinatario}  onChange={props.handleChange} className="card-input" id="correo_destinatario" placeholder="" required />
                                </CCol>        
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Poblado/Municipio</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.municipio_destinatario} onChange={props.handleChange} className="card-input" id="municipio_destinatario" placeholder="" required />
                                </CCol>   
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Dirección</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput  value={props.data.direccion_destinatario} onChange={props.handleChange} className="card-input" id="direccion_destinatario" placeholder="" required />
                                </CCol>   
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Referencias de dirección</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput value={props.data.referencias_destinatario} onChange={props.handleChange} className="card-input" id="referencias_destinatario" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <br/>

            <div className="creacion-pedido-button-envio">
                <CRow className="mb-4">
                    <CCol>
                        <CRow>
                            <CCol sm="5">
                                <div className="creacion-pedido-button-title">
                                    <h4>¿Quién pagará el envío:</h4>
                                </div>
                                
                            </CCol>
                            <CCol sm="3">
                                <CRow className="switch-container">          
                                    <label className="switch">
                                        <input type="checkbox" id="seguro" />
                                        <div className="slider round">
                                        <span className="on">Remitente</span>
                                        <span className="off">Destinatario</span>
                                        </div>
                                    </label>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCol>
                    {/* <CCol sm="0"></CCol> */}
                    <CCol sm="4">
                        <CRow className="buttons-next">
                            <label className="next">
                                Siguiente
                            </label>
                            <button 
                                type="button" 
                                className="btn btn-danger btn-circle btn-xl"
                                onClick={
                                    ()=>{
                                        if(props.checkNextStep(1)){
                                            props.changeStep(1);
                                            document.body.scrollTop = document.documentElement.scrollTop = 0;
                                        }
                                    }
                                }
                            > 
                            <CIcon 
                                style={{color: 'white', width: '2rem', height: '2rem', fontSize: '2rem'}}
                                name="cil-arrow-right" 
                            />
                            </button>
                        </CRow>
                    </CCol>
                </CRow>
            </div>
            <br/>
        </>
    )
}

const Step2 = (props) => {
    const { addToast } = useToasts();
    const [seguro, setSeguro] = useState('off');
    const [cod, setCod] = useState('off');
    const [cupon_value, setCuponValue] = useState(0);
    const [total_valor_declarado, setTotalValorDeclarado] = useState(0.00);
    const [render_rows, setRenderRows] = useState(null);
    const [rows_jsx, setRowsJSX] = useState(null);

    const handleChange = (e) =>{
        const {id, value} = e.target;
        if(id === 'cod'){
            if(cod === 'on'){
                setCod('off');
                props.setCod(0);
            }else if(cod === 'off'){
                setCod('on');
            }
        }
        if(id === 'seguro'){
            if(seguro === 'on'){
                setSeguro('off');
                props.setSeguro(0);
            }else if(seguro === 'off'){
                setSeguro('on');
            }
        }

        let val;

        if(id === 'seguro_input'){
            if(value === ''){
                val = '';
            }else{
                val = parseFloat(value);
            }
            props.setSeguro(val);
        }

        if(id === 'cod_input'){
            if(value === ''){
                val = '';
            }else{
                val = parseFloat(value);
            }
            props.setCod(val);
        }

        if(id === 'cupon_input'){
            props.setCupon(value);
            if(value.length === 6){
                let isValid = checkCoupon(value);
                if(!isValid.valid){
                    addToast(`Cupon invalido`, { 
                        appearance: 'error', 
                        autoDismiss : true ,
                        autoDismissTimeout : 4000
                    });
                    setCuponValue(0);
                    props.setCupon(isValid.value);
                }else{
                    addToast(`Cupon Aplicado Exitosamente`, { 
                        appearance: 'success', 
                        autoDismiss : true ,
                        autoDismissTimeout : 4000
                    });
                    setCuponValue(isValid.value);
                    props.setCupon(isValid.value);
                }
            }else{
                setCuponValue(0);
            }
        }
    }

    const checkCoupon = (cupon) =>{
        let valid = true;
        let val = 10;
        if(cupon === 'TEST01'){
            valid = true;
            val = 10;
        }else{
            valid = false;
            val = 0;
        }

        return {
            valid: valid, 
            value: val
        };
    }

    const nextStep = () =>{
        if(props.rows_data.length === 0){
            addToast(`Tiene que añadir un paquete para continuar`, { 
                appearance: 'error', 
                autoDismiss : true ,
                autoDismissTimeout : 4000
            });
            return false;
        }

        props.changeStep(2);
    }

    useEffect(()=>{
        let value = 0.00;
        let render = [];
        console.log("CAMBIO DE DATA", props.rows_data);
        if(props.rows_data){
            setRowsJSX([]);
            if(props.rows_data.length > 0){
                props.rows_data.forEach((elem, index)=>{
                    console.log(elem);
                    value += parseFloat(elem.precio);
                    render.push(<RowPackageStatic rows={props.rows_data} setRows={props.setRowsData} key={`row-${index}`} data={elem} number={index} />); 
                })
                console.log(render);
                setRenderRows([...render]);
                setTotalValorDeclarado(value);
            }else{
                setTotalValorDeclarado(0);
            }
        }
    }, [props.rows_data])


    useEffect(()=>{
        var rows = [];
        if(render_rows){
            if(render_rows.length > 0){
                for (var i = 0; i < render_rows.length; i++) {
                    rows.push(render_rows[i]);
                }
                setRowsJSX(rows);
            }
        }
    },[render_rows])

    return (
        <>
            <div className="creacion-pedido-progress-bar">
                <CRow>
                    <CCol sm="9">
                    </CCol>
                    <CCol sm="3">
                        <div  className="wrap">
                            <ul id="progressbar">
                                <li className="active" id="first"><strong></strong></li>
                                <li className="active" id="second"><strong></strong></li>
                                <li id="third"><strong></strong></li>
                            </ul>
                        </div>
                    </CCol>
                </CRow>
            </div>

                <CCard className="creacion-pedido-card">
                    <CCardBody className="card-body">
                        <CRow>
                            <CCol sm="12">
                                <div className="card-title-step2">
                                    <h3>Paquetes</h3>
                                </div>
                            </CCol>
                        </CRow>
                        {(Array.isArray(rows_jsx))? (rows_jsx.length > 0) ? <br/> : null : null}
                        {rows_jsx}
                        {(Array.isArray(rows_jsx))? (rows_jsx.length > 0) ? <br/> : null : null}
                        <RowPackage rows={props.rows_data} addRow={props.setRowsData} />

                    </CCardBody>
                </CCard>

                <CCard className="creacion-pedido-card" style={{backgroundColor: '#FEFEFE'}}>
                    <CCardBody className="card-body">
                        <CRow>
                            <CCol sm="9">
                                <div className="card-title">
                                    <CRow>
                                        <h3>¿Es servicio pago contra entrega (COD)?&nbsp;&nbsp;&nbsp;</h3>
                                        <label className="switch">
                                            <input type="checkbox" id="cod" value={cod} onChange={handleChange} />
                                            <div className="slider round">
                                            <span className="on">Si</span>
                                            <span className="off">No</span>
                                            </div>
                                        </label>
                                    </CRow>
                                </div>
                                <CFormGroup style={{display:(cod === 'off')? 'none':'block'}}>
                                        <div className="input-box">
                                            <span className="prefix">Q</span>
                                            <CInput value={props.cod_value} onChange={handleChange} className="card-input" type="number" id="cod_input" placeholder="monto" style={{backgroundColor: '#F4F5F9'}} required />
                                        </div>
                                </CFormGroup>
                                <div className="card-body-step2">
                                    Al elegir servicio COD, su mercadería es cobrada en el destino. El monto se acreditará en su cuenta bancaria con un recargo del 4% del valor declarado y será descontado del monto a cobrar.
                                </div>
                            </CCol>
                        </CRow>
                        <CRow className="creacion-pedido-seguro-section">
                            <CCol sm="9">
                                <div className="card-title">
                                    <CRow>
                                        <h3>¿Deseas seguro adicional?&nbsp;&nbsp;&nbsp;</h3>
                                        <label className="switch">
                                            <input type="checkbox" id="seguro" value={seguro} onChange={handleChange}/>
                                            <div className="slider round">
                                            <span className="on">Si</span>
                                            <span className="off">No</span>
                                            </div>
                                        </label>
                                    </CRow>
                                </div>
                                <CFormGroup style={{display:(seguro === 'off')? 'none':'block'}}>
                                    <div className="input-box">
                                        <span className="prefix">Q</span>
                                        <CInput  type="number" onChange={handleChange} value={props.seguro} className="card-input" id="seguro_input" placeholder="monto a asegurar" style={{backgroundColor: '#F4F5F9'}} required />
                                    </div>
                                </CFormGroup>
                                <div className="card-body-step2">
                                    Toda la mercadería está asegurada por un monto de hasta Q.500.00. Sin embargo puedes optar por asegurarla por un monto mayor con un recargo del 2%.
                                </div>
                            </CCol>
                        </CRow>
                        <br/>
                        <CRow className="ml-2 mr-2" style={{borderBottom: '2px solid #153b75'}}>

                        </CRow>
                        <br/>
                        <CRow>
                            <CCol sm="5">
                                <div className="card-title">
                                    <h3>Tengo un cupón</h3>
                                </div>
                                <CFormGroup>
                                    <CInput className="card-input" onChange={handleChange} id="cupon_input" placeholder="añadir código" style={{backgroundColor: '#F4F5F9'}} required />
                                </CFormGroup>
                            </CCol>
                            <CCol sm="7" className="card-values-conecta">
                               <CRow>
                                    <CCol sm="8">Total Valor Declarado</CCol>
                                    <CCol sm="4">{(total_valor_declarado === 0) ? '-' : `Q ${total_valor_declarado}`}</CCol>
                               </CRow>
                               <CRow className="card-values-conecta">
                                    <CCol sm="8">Seguro Adicional</CCol>
                                    <CCol sm="4">{(props.seguro === 0 || props.seguro === '') ? '-' : `Q ${props.seguro}`}</CCol>
                               </CRow>
                               <CRow className="card-values-conecta">
                                    <CCol sm="8">Aplica Cupon</CCol>
                                    <CCol sm="4">{(cupon_value === 0) ? '-' : `- Q ${cupon_value}`}</CCol>
                               </CRow>
                               <CRow className="card-values-conecta">
                                    <CCol sm="8">Costo de envio</CCol>
                                    <CCol sm="4">-</CCol>
                               </CRow>
                               <CRow className="card-values-conecta">
                                    <CCol sm="8">Fee por COD</CCol>
                                    <CCol sm="4">-</CCol>
                               </CRow>
                            </CCol>
                        </CRow>
                        <CRow>

                        </CRow>
                    </CCardBody>
                </CCard>

                <div className="creacion-pedido-button-envio">
                    <CRow className="mb-4">
                        <CCol sm="4">
                            <CRow className="buttons-back">
                                <button 
                                    type="button" 
                                    className="btn btn-danger btn-circle btn-xl"
                                    style={{ backgroundColor: '#bfc7d8' }}
                                    onClick={
                                        ()=>{
                                            props.changeStep(0);
                                        }
                                    }
                                > 
                                <CIcon 
                                    style={{
                                        color: 'white', 
                                        width: '2rem', 
                                        height: '2rem', 
                                        fontSize: '2rem',
                                        transform: 'rotate(180deg)'
                                    }}
                                    name="cil-arrow-right" 
                                />
                                </button>
                                <label className="back">
                                    Anterior
                                </label>
                            </CRow>
                        </CCol>
                        <CCol sm="4">
                        </CCol>
                        <CCol sm="4">
                            <CRow className="buttons-next">
                                <label className="next">
                                    Siguiente
                                </label>
                                <button 
                                    type="button" 
                                    className="btn btn-danger btn-circle btn-xl"
                                    onClick={nextStep}
                                > 
                                <CIcon 
                                    style={{color: 'white', width: '2rem', height: '2rem', fontSize: '2rem'}}
                                    name="cil-arrow-right" 
                                />
                                </button>
                            </CRow>
                        </CCol>
                    </CRow>
                </div>
        </>
    )
}

const Step3 = (props) => {
    const inputFile = useRef(null) 
    const [valor, setValor] = useState(0); 

    useEffect(()=>{
        let value = 0.00;
        if(props.rows_data){
            if(props.rows_data.length > 0){
                props.rows_data.forEach((elem, index)=>{
                    console.log(elem);
                    value += parseFloat(elem.precio);
                })
                setValor(value);
            }else{
                setValor(0);
            }
        }
    }, [])


    return (
        <>
            <div className="creacion-pedido-progress-bar">
                <CRow>
                    <CCol sm="9">
                    </CCol>
                    <CCol sm="3">
                        <div  className="wrap">
                            <ul id="progressbar">
                                <li className="active" id="first"><strong></strong></li>
                                <li className="active" id="second"><strong></strong></li>
                                <li className="active" id="third"><strong></strong></li>
                            </ul>
                        </div>
                    </CCol>
                </CRow>
            </div>

            <CCard className="creacion-pedido-card creacion-pedido-step3">
                <CCardBody className="card-body">
                    <CRow>
                        <CCol sm="5">
                            <div className="card-title">
                                <h3>Resumen</h3>
                            </div>

                        </CCol>
                    </CRow>
                    <br/>
                    <CRow className="data-info-client-header mb-1">
                        <CCol sm="5">
                            <CRow >
                                <h5 className="text-left-number-order-key">No. de Orden: </h5>&nbsp; &nbsp;
                                <h5 className="text-left-number-order-value"> 12345678</h5>
                            </CRow>
                        </CCol>
                        <CCol sm="7">
                            <CRow className="paquetes-number mr-2">
                                <h5 className="text-left-number-order-key">No. de paquetes: &nbsp; &nbsp;</h5> 
                                <h5 className="text-left-number-order-value">{props.rows_data.length}</h5>
                            </CRow>
                        </CCol>
                    </CRow>

                    <CRow className="data-info-client mb-4">
                        <CCol sm="12">
                            <CRow>
                                <p style={{fontWeight:'600'}}>Envia: &nbsp;</p>
                                <p style={{fontWeight:'600'}}> {props.data.nombre_empresa_remitente}</p>
                            </CRow>
                            <CRow>
                                <p>Contacto: &nbsp;</p>
                                <p>{props.data.remitente}</p>
                            </CRow>
                            <CRow>
                                <p>Correo Electronico: &nbsp;</p>
                                <p>{props.data.correo_remitente}</p>
                            </CRow>
                            <CRow>
                                <p>Telefono: &nbsp;</p>
                                <p>{props.data.telefono_remitente}</p>
                            </CRow>
                            <CRow>
                                <p>Direccion: &nbsp;</p>
                                <p>{props.data.direccion_remitente}</p>
                            </CRow>
                        </CCol>
                    </CRow>

                    <CRow className="data-info-client mb-4">
                        <CCol sm="12">
                            <CRow>
                                <p style={{fontWeight:'600'}}>Recibe: &nbsp;</p>
                                <p style={{fontWeight:'600'}}> {props.data.name_destinatario}</p>
                            </CRow>
                            <CRow>
                                <p>Contacto: &nbsp;</p>
                                <p>{props.data.destinatario}</p>
                            </CRow>
                            <CRow>
                                <p>Correo Electronico: &nbsp;</p>
                                <p>{props.data.correo_destinatario}</p>
                            </CRow>
                            <CRow>
                                <p>Telefono: &nbsp;</p>
                                <p>{props.data.telefono_destinatario}</p>
                            </CRow>
                            <CRow>
                                <p>Direccion: &nbsp;</p>
                                <p>{props.data.direccion_destinatario}</p>
                            </CRow>
                        </CCol>
                    </CRow>

                    <CRow className="separate-row mb-4"></CRow>

                    <CRow className="data-info-client-price mb-4">
                        <CCol sm="12">
                            <CRow className="price-underline">
                                <p className="price-label" >
                                    Precio del Servicio: &nbsp;
                                </p>
                                <p className="price"> 
                                    Q. {valor}
                                </p>
                            </CRow>
                        </CCol>
                        <CCol sm="6">
                            <CRow className="text-price">
                                <p>Nuestras entregas en ciudad capital y zonas aledañas es menos de 5 horas bajo cobertura.
                                <br/>    
                                <br/>    
                                Las entregas al interior se realizan entre 24 a 72 horas bajo cobertura.</p>
                            </CRow>
                        </CCol>
                    </CRow>

                    <CRow className="separate-row mb-4"></CRow>

                    <CRow className="mb-3">
                        <CCol sm="5">
                            <div className="card-title">
                                <h3>Cobro del envío</h3>
                            </div>
                        </CCol>
                    </CRow>

                    <CRow className="pills-pago">
                        <CCol sm="3">
                            <CRow className="switch-container">          
                                <p className="text-pago">Efectivo</p>
                                <label className="switch">
                                    <input type="checkbox" id="efectivo-pago" />
                                    <div className="slider round">
                                    <span className="on">Si</span>
                                    <span className="off">no</span>
                                    </div>
                                </label>
                            </CRow>
                        </CCol>
                        <CCol sm="5">
                            <CRow className="switch-container">          
                                <p className="text-pago">Transferencia Bancaria</p>
                                <label className="switch">
                                    <input type="checkbox" id="transferencia-pago" />
                                    <div className="slider round">
                                    <span className="on">Si</span>
                                    <span className="off">no</span>
                                    </div>
                                </label>
                            </CRow>
                        </CCol>
                        <CCol sm="4">
                            <CRow className="switch-container">          
                                <p className="text-pago">Al entregar mi paquete</p>
                                <label className="switch">
                                    <input type="checkbox" id="entrega-pago" />
                                    <div className="slider round">
                                    <span className="on">Si</span>
                                    <span className="off">no</span>
                                    </div>
                                </label>
                            </CRow>
                        </CCol>
                    </CRow>

                    <CRow className="data-info-client-conecta mb-4">
                        <CCol sm="6" className="mt-5">
                            <CRow>
                                <p className="info" >
                                    No. de cuenta: &nbsp;
                                </p>
                            </CRow>
                            <CRow>
                                <p className="info"> 
                                    903411890
                                </p>
                            </CRow>
                            <CRow>
                                <p className="info"> 
                                    BAC - Monetaria
                                </p>
                            </CRow>
                            <CRow>
                                <p className="info"> 
                                    AIM Digital de Guatemala S.A.
                                </p>
                            </CRow>
                        </CCol>
                        <CCol sm="6" className="mt-5 pt-4 button-vaucher">
                            <CRow>
                                <CCol sm="3" className="mb-3"></CCol>
                                <CCol sm="6" xl className="mb-3">
                                    <CButton 
                                        block color="secondary" 
                                        style={{fontSize: '1.2rem'}}
                                        onClick={() => {
                                            // `current` points to the mounted file input element
                                           inputFile.current.click();
                                        }}
                                    >Subir voucher</CButton>
                                </CCol>
                                <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
                                <CCol sm="3"  className="mb-3"></CCol>
                            </CRow>
                        </CCol>
                    </CRow>

                </CCardBody>
            </CCard>

            <div className="creacion-pedido-button-envio">
                <CRow className="mb-4">
                    <CCol sm="4">
                        <CRow className="buttons-back">
                            <button 
                                type="button" 
                                className="btn btn-danger btn-circle btn-xl"
                                style={{ backgroundColor: '#bfc7d8' }}
                                onClick={
                                    ()=>{
                                        props.changeStep(1);
                                    }
                                }
                            > 
                            <CIcon 
                                style={{
                                    color: 'white', 
                                    width: '2rem', 
                                    height: '2rem', 
                                    fontSize: '2rem',
                                    transform: 'rotate(180deg)'
                                }}
                                name="cil-arrow-right" 
                            />
                            </button>
                            <label className="back">
                                Anterior
                            </label>
                        </CRow>
                    </CCol>
                    <CCol sm="4">
                    </CCol>
                    <CCol sm="4">
                        <CRow className="buttons-next">
                            <label className="next" style={{fontSize:'1.3rem'}}>
                                Finalizar Orden
                            </label>
                            <button 
                                type="button" 
                                className="btn btn-danger btn-circle btn-xl"
                                // onClick={nextStep}
                            > 
                            <CIcon 
                                style={{color: 'white', width: '2rem', height: '2rem', fontSize: '2rem'}}
                                name="cil-arrow-right" 
                            />
                            </button>
                        </CRow>
                    </CCol>
                </CRow>
            </div>
        </>
    )
}

const Step4 = (props) => {
    const inputFile = useRef(null) 
    const [valor, setValor] = useState(0); 

    useEffect(()=>{
        let value = 0.00;
        if(props.rows_data){
            if(props.rows_data.length > 0){
                props.rows_data.forEach((elem, index)=>{
                    console.log(elem);
                    value += parseFloat(elem.precio);
                })
                setValor(value);
            }else{
                setValor(0);
            }
        }
    }, [])


    return (
        <>
            <CContainer className="creacion-pedido-step4">
                <CRow className="title-container">
                    <h3 className="title">Orden Finalizada</h3>
                </CRow>
                <CRow className="subtitle-container">
                    Favor descarga esta guía y pegala en tu paquete
                </CRow>
                <br/>
                <CRow className="subtitle-container">
                    <CButton block color="primary"> Descargar guía </CButton>
                </CRow>
                <br/>
                <CRow className="subtitle-container-info">
                    Puedes compartir el siguiente tracking con tu cliente para manterle informado del estado de su pedido.
                </CRow>
                <br/>
                <CRow className="link-pedido">
                    <a href="/">33446740-43-42555071720P721</a>
                </CRow>
                <br/>
                <CRow className="recomendaciones-container">
                    <CCol sm="6">
                        <p className="title">Recomendaciones de embalaje</p>
                        <ul>
                            <li>
                                Recuerda embalar bien tus productos de preferencia sellados dentro de una caja.
                            </li>
                            <li>
                                Si es frágil, añadele una etiqueta y rellenalo con duroport, esponja o cartón a manera de proteger tu producto.
                            </li>
                            <li>
                                Si envías galones, botellas o frascos, deberás embalarlos dentro de una caja de preferencia envueltos en plástico.
                            </li>
                        </ul>
                    </CCol>
                    <CCol sm="6">
                        <CImg
                            src={"img/hero/embalaje.png"}
                            className="d-inline-block img-fluid embalaje-hero"
                            alt="embalaje conecta"
                        />
                    </CCol>
                </CRow>
                <br/>
                <CRow className="button-again">
                    <CButton block style={{backgroundColor:'#e9f114', color: '#153b75'}}>Realizar más envíos</CButton>
                </CRow>
                <br/>
            </CContainer>
        </>
    )
}



const RowPackageStatic = (props) => {
    const [new_package, setPackage] = useState(props.data);
    const [accordion, setAccordion] = useState(1)
    const [collapse, setCollapse] = useState(false)

    const toggle = (e) => {
        setCollapse(!collapse)
        e.preventDefault()
      }

    const deletePackage = (id) =>{
        console.log(id);
        let allRows = [...props.rows];
        
        // let newRows = allRows.filter(elem => elem.id !== id);
        // let newRows; 

        for (var i = 0; i < allRows.length; i++) {
            var obj = allRows[i];
        
            if (id === obj.id) {
                allRows.splice(i, 1);
                i--;
            }
        }

        console.log(allRows);
        props.setRows(allRows);

    } 
    
    return(
        <>   
            <CCard className="mb-0">
                <CCardHeader id="headingOne">
                  <CButton 
                    block 
                    className="text-left m-0 p-0" 
                    onClick={() => setAccordion(accordion === 0 ? null : 0)}
                    style={{ color: '#153b75', fontWeight: '600'}}
                  >
                    <h5 className="m-0 p-0" style={{ color: '#153b75', fontWeight: '600'}}>Paquete # {props.number+1}</h5>
                  </CButton>
                </CCardHeader>
                <CCardBody style={{display:(accordion === 0) ? 'block': 'none', paddingTop: '0'}}>
                    <CCollapse show={accordion === 0}>       
                        <CRow className="row-package"> 
                                <CCol sm="3">
                                    <CRow>
                                        <div className="card-title-column">
                                            Descripción 
                                        </div>
                                    </CRow>
                                    <CRow>       
                                        <CInput type="text" id="paquete" className="card-input" disabled value={new_package.paquete} placeholder="" style={{background:'white', border: '0px'}}/>
                                    </CRow>
                                </CCol>
                                <CCol sm="2">
                                    <CRow>
                                        <div className="card-title-column">
                                            Tipo de transporte<div className="asterisk">&nbsp;*</div>
                                        </div>
                                    </CRow>
                                    <CRow>
                                        <CInput type="text" id="transporte" className="card-input"  disabled value={new_package.transporte} placeholder="" style={{background:'white', border: '0px'}}/>
                                    </CRow>
                                </CCol>
                                <CCol sm="2">
                                    <CRow>
                                        <div className="card-title-column">
                                            Peso<div className="asterisk">&nbsp;*</div> 
                                        </div>
                                    </CRow>
                                    <CRow>
                                        <CInput type="text" id="peso" className="card-input"  disabled value={new_package.peso} placeholder="" style={{background:'white', border: '0px'}}/>
                                    </CRow>
                                </CCol>
                                <CCol sm="2">
                                    <CRow>
                                        <div className="card-title-column">
                                            Valor declarado<div className="asterisk">&nbsp;*</div> 
                                        </div>
                                    </CRow>
                                    <CRow>
                                        <CInput type="text" id="precio" className="card-input"  disabled value={new_package.precio} placeholder="" style={{background:'white', border: '0px'}}/>
                                    </CRow>
                                </CCol>
                                <CCol sm="2">
                                    <CRow>
                                        <div className="card-title-column">
                                            Fragil<div className="asterisk">&nbsp;*</div> 
                                        </div>
                                    </CRow>
                                    <CRow className="slider-fragil">
                                        <CSwitch 
                                        className={'mx-1'} 
                                        variant={'3d'} 
                                        color={'success'}  
                                        id="fragil" 
                                        checked={(new_package.fragil === 'on')?true: false}
                                        value={new_package.fragil} 
                                        disabled   />
                                    </CRow>
                                </CCol>
                                <CCol sm="1">
                                    <CRow>
                                        <div className="card-title-column">
                                            &nbsp; 
                                        </div>
                                    </CRow>
                                    <CRow className="slider-fragil" onClick={()=>{
                                                deletePackage(props.data.id)
                                            }}
                                        style={{cursor:'pointer', width:'fit-content'}}
                                        >
                                        <CIcon 
                                            style={{color: 'red', width: '1.5rem', height: '1.5rem', fontSize: '1.5rem',cursor:'pointer'}}
                                            name="cil-x-circle" 
                                        />
                                    </CRow>
                                </CCol>
                            </CRow>
                    </CCollapse>
                </CCardBody>
            </CCard>
        </>
    ) 
}


const RowPackage = (props) => {
    const { addToast } = useToasts();
    const [ check, setCheck ] = useState(false);
    const [new_package, setPackage] = useState({
        paquete: '',
        transporte: '',
        peso: '',
        precio: '',
        fragil: 'off',
        id: ''
    });
    
    const handleChange = (e) => {
        const {id, value} = e.target;
        const form_object = JSON.parse(JSON.stringify(new_package));
        let new_data = {
            ...form_object,
            [id]: value
        };
        setPackage(new_data);
    }

    const clickSwitch = () =>{
        let value_switch;
        if(check){
            value_switch = false;
            setCheck(false);
        }else{
            value_switch = true;
            setCheck(true);
        }
        const form_object = JSON.parse(JSON.stringify(new_package));
        let new_data = {
            ...form_object,
            fragil: (value_switch) ? 'on' : 'off'
        };
        setPackage(new_data);

    }

    const submitRow = () =>{
        let clone_objects = [...props.rows];
        let labels = {
            paquete: 'Paquete',
            transporte: 'Transporte',
            peso: 'Peso',
            precio: 'Precio',
            id: 'id'
        }
        let error = false;
        for (const [key, value] of Object.entries(new_package)) {
            if(value.length === 0 && key !== 'id'){
                addToast(`El campo ${labels[key]} es requerido`, { 
                    appearance: 'error', 
                    autoDismiss : true ,
                    autoDismissTimeout : 4000
                });
                error = true;
            }
        }
        if(error){
            return false;
        }

        if(parseInt(new_package.peso) > 25 && new_package.transporte === 'Moto'){
            addToast(`El tipo de transporte elegido no es ideal para 
                      transportar su producto, puede tener algún recargo 
                      o problema al momento de la recolecta`, { 
                appearance: 'warning', 
                autoDismiss : true ,
                autoDismissTimeout : 4000
            }); 
            // error = true;
        }

        if(error){
            return false;
        }
        let paquete_con_id = JSON.parse(JSON.stringify(new_package));
        const new_id =  uuidv4();
        paquete_con_id.id = new_id;

        clone_objects.push(paquete_con_id);
        props.addRow(clone_objects);
        console.log(clone_objects);
        setPackage({
            paquete: '',
            transporte: '',
            peso: '',
            precio: '',
            fragil: 'off',
            id: ''
        });
        setCheck(false);
    }
    return(
        <>          
            <CRow className="row-package"> 
                <CCol sm="3">
                    <CRow>
                        <div className="card-title-column">
                            Descripción 
                        </div>
                    </CRow>
                    <CRow>       
                        <CInput 
                            type="text" 
                            id="paquete" 
                            className="card-input" 
                            onChange={handleChange} 
                            value={new_package.paquete} 
                            placeholder="Un paquete con" 
                            style={{background:'white', border: '0px'}}
                        />
                    </CRow>
                </CCol>
                <CCol sm="2">
                    <CRow>
                        <div className="card-title-column">
                            Tipo de transporte<div className="asterisk">&nbsp;*</div>
                        </div>
                    </CRow>
                    <CRow>
                        <select 
                            id="transporte" 
                            className="card-input" 
                            onChange={handleChange} 
                            value={new_package.transporte} 
                            placeholder="" 
                            style={{background:'white', border: '0px', color: '#768192'}} 
                        >
                            <option value="">Tipo</option>
                            <option value="Moto">Moto</option>
                            <option value="Panel">Panel</option>
                        </select>
                    </CRow>
                </CCol>
                <CCol sm="2">
                    <CRow>
                        <div className="card-title-column">
                            Peso<div className="asterisk">&nbsp;*</div> 
                        </div>
                    </CRow>
                    <CRow>
                        <div className="input-box">
                            <CInput 
                                type="number" 
                                id="peso" 
                                className="card-input" 
                                onChange={handleChange} 
                                value={new_package.peso} 
                                placeholder="" 
                                style={{
                                    background:'white', 
                                    border: '0px',
                                }}
                            />
                            <span className="prefix">Lbs</span>
                        </div>
                    </CRow>
                </CCol>
                <CCol sm="2">
                    <CRow>
                        <div className="card-title-column">
                            Valor declarado<div className="asterisk">&nbsp;*</div> 
                        </div>
                    </CRow>
                    <CRow>
                        <div className="input-box">
                            <span className="prefix">Q</span>
                            <CInput 
                                type="number" 
                                id="precio" 
                                className="card-input" 
                                onChange={handleChange} 
                                value={new_package.precio} 
                                placeholder="" 
                                style={{background:'white', border: '0px'}}
                            />
                        </div>
                        
                    </CRow>
                </CCol>
                <CCol sm="2">
                    <CRow>
                        <div className="card-title-column">
                            Fragil<div className="asterisk">&nbsp;*</div> 
                        </div>
                    </CRow>
                    <CRow>
                        <CSwitch 
                        onChange={clickSwitch} 
                        className={'mx-1'} 
                        variant={'3d'} 
                        color={'success'}  
                        id="fragil"    
                        checked={check}
                        />
                    </CRow>
                </CCol>
                <CCol sm="1">
                    <CRow>
                        <div className="card-title-column">
                            &nbsp; 
                        </div>
                    </CRow>
                    <CRow>
                        {/* <CIcon 
                            style={{color: 'red', width: '1.5rem', height: '1.5rem', fontSize: '1.5rem'}}
                            name="cil-x-circle" 
                        /> */}
                    </CRow>
                </CCol>
            </CRow>

            <CRow className="mt-3">
                <CCol col="9" sm="9" md="9"> 

                </CCol>
                <CCol col="3" sm="3" md="3">
                    <CCol  xl className="mb-3 mb-xl-0">
                        <CButton block shape="pill" 
                            className=""
                            style={{
                                backgroundColor:"#4F6CBC",
                                border:"1px solid #4F6CBC",
                                color:"white"
                            }}
                            onClick={submitRow} 
                        >agregar paquete</CButton>
                    </CCol>
                </CCol>
            </CRow>
        </>
    ) 
}


export default CreacionPedido

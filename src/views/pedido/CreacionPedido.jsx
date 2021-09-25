import React, { lazy, Fragment, useState, useEffect, useHistory} from 'react'
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
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {reactLocalStorage} from 'reactjs-localstorage';
import MainChartExample from '../charts/MainChartExample.js'
import { ToastProvider, useToasts } from 'react-toast-notifications';

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))



const CreacionPedido = () => {
    const { addToast } = useToasts();
    const [step, setStep] = useState(0);
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


    const handleChange = (e) => {
        const {id, value} = e.target;
        let data_copy = JSON.parse(JSON.stringify(data));
        data_copy = {
            ...data_copy,
            [id]: value 
        }
        console.log(data_copy);
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
    <div className="creacion-pedido">
        {(step === 0) ? 
        <Step1 changeStep={setStep} data={data} handleChange={handleChange} user={user} checkNextStep={nextStep} />
         : 
         (step === 1) ? <Step2 changeStep={setStep} />
         :  
         <Step3 changeStep={setStep} />}
    </div>
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
                <CRow>
                    <CCol sm="4">
                        <div className="creacion-pedido-button-title">
                            <h4>¿Quién pagará el envío:</h4>
                        </div>
                        
                    </CCol>
                    <CCol sm="3">
                        <CRow>          
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

                <CRow>
                    <CCol sm="9">
                    </CCol>
                    <CCol className="col-md-auto">
                        <div style={{width: 'auto', display: 'inline-flex', float:'right'}}>
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
                        </div>
                    </CCol>
                </CRow>
            </div>
            <br/>
        </>
    )
}

const Step2 = (props) => {
    const [rows_data, setRowsData] = useState([]);

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

                        {rows_data.map((elem,index)=>{
                            return <RowPackageStatic key={`row-${index}`} data={elem} />
                        })}
                        <RowPackage rows={rows_data} addRow={setRowsData} />

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
                                            <input type="checkbox" id="cod" />
                                            <div className="slider round">
                                            <span className="on">Si</span>
                                            <span className="off">No</span>
                                            </div>
                                        </label>
                                    </CRow>
                                </div>
                                <CFormGroup>
                                    <CInput className="card-input" id="cod" placeholder="monto" style={{backgroundColor: '#F4F5F9'}} required />
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
                                            <input type="checkbox" id="seguro" />
                                            <div className="slider round">
                                            <span className="on">Si</span>
                                            <span className="off">No</span>
                                            </div>
                                        </label>
                                    </CRow>
                                </div>
                                <CFormGroup>
                                    <CInput className="card-input" id="seguro" placeholder="monto a asegurar" style={{backgroundColor: '#F4F5F9'}} required />
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
                                    <CInput className="card-input" id="codigo" placeholder="añadir código" style={{backgroundColor: '#F4F5F9'}} required />
                                </CFormGroup>
                            </CCol>
                            <CCol sm="7" className="card-values-conecta">
                               <CRow>
                                    <CCol sm="8">Total Valor Declarado</CCol>
                                    <CCol sm="4">-</CCol>
                               </CRow>
                               <CRow className="card-values-conecta">
                                    <CCol sm="8">Seguro Adicional</CCol>
                                    <CCol sm="4">-</CCol>
                               </CRow>
                               <CRow className="card-values-conecta">
                                    <CCol sm="8">Aplica Cupon</CCol>
                                    <CCol sm="4">-</CCol>
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
                        </CCol>
                        <CCol sm="4">
                        </CCol>
                        <CCol sm="4">
                            <label className="next">
                                Siguiente
                            </label>
                            <button 
                                type="button" 
                                className="btn btn-danger btn-circle btn-xl"
                                onClick={
                                    ()=>{
                                        props.changeStep(2);
                                    }
                                }
                            > 
                            <CIcon 
                                style={{color: 'white', width: '2rem', height: '2rem', fontSize: '2rem'}}
                                name="cil-arrow-right" 
                            />
                            </button>
                        </CCol>
                    </CRow>
                </div>
        </>
    )
}

const Step3 = (props) => {
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

            <CCard className="creacion-pedido-card">
                <CCardBody className="card-body">
                    <CRow>
                        <CCol sm="5">
                            <div className="card-title">
                                <h3>Resumen</h3>
                            </div>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>

            <div className="creacion-pedido-button-envio">
                <CRow>
                    <CCol sm="2">
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
                    </CCol>
                    <CCol sm="8">
                    </CCol>
                    <CCol sm="2">
                        
                    </CCol>
                </CRow>
            </div>
        </>
    )
}


const RowPackageStatic = (props) => {
    const [new_package, setPackage] = useState(props.data);
    
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
                    <CRow>
                        <CSwitch className={'mx-1'} variant={'3d'} color={'success'}  id="fragil"  disabled  defaultChecked />
                    </CRow>
                </CCol>
                <CCol sm="1">
                    <CRow>
                        <div className="card-title-column">
                            &nbsp; 
                        </div>
                    </CRow>
                    <CRow>
                        <CIcon 
                            style={{color: 'red', width: '1.5rem', height: '1.5rem', fontSize: '1.5rem'}}
                            name="cil-x-circle" 
                        />
                    </CRow>
                </CCol>
            </CRow>
        </>
    ) 
}


const RowPackage = (props) => {
    const { addToast } = useToasts();
    const [new_package, setPackage] = useState({
        paquete: '',
        transporte: '',
        peso: '',
        precio: '',
        fragil: 'on'
    });
    
    const handleChange = (e) => {
        const {id, value} = e.target;
        const form_object = JSON.parse(JSON.stringify(new_package));
        let new_data = {
            ...form_object,
            [id]: value
        };
        console.log(new_data);
        setPackage(new_data);
    }

    const submitRow = () =>{
        let clone_objects = [...props.rows];
        let labels = {
            paquete: 'Paquete',
            transporte: 'Transporte',
            peso: 'Peso',
            precio: 'Precio'
        }
        let error = false;
        for (const [key, value] of Object.entries(new_package)) {
            if(value.length === 0){
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
        clone_objects.push(new_package);
        props.addRow(clone_objects);
        console.log(clone_objects);
        setPackage({
            paquete: '',
            transporte: '',
            peso: '',
            precio: '',
            fragil: 'on'
        })

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
                        <CInput type="text" id="paquete" className="card-input" onChange={handleChange} value={new_package.paquete} placeholder="" style={{background:'white', border: '0px'}}/>
                    </CRow>
                </CCol>
                <CCol sm="2">
                    <CRow>
                        <div className="card-title-column">
                            Tipo de transporte<div className="asterisk">&nbsp;*</div>
                        </div>
                    </CRow>
                    <CRow>
                        <CInput type="text" id="transporte" className="card-input"  onChange={handleChange} value={new_package.transporte} placeholder="" style={{background:'white', border: '0px'}}/>
                    </CRow>
                </CCol>
                <CCol sm="2">
                    <CRow>
                        <div className="card-title-column">
                            Peso<div className="asterisk">&nbsp;*</div> 
                        </div>
                    </CRow>
                    <CRow>
                        <CInput type="text" id="peso" className="card-input"  onChange={handleChange} value={new_package.peso} placeholder="" style={{background:'white', border: '0px'}}/>
                    </CRow>
                </CCol>
                <CCol sm="2">
                    <CRow>
                        <div className="card-title-column">
                            Valor declarado<div className="asterisk">&nbsp;*</div> 
                        </div>
                    </CRow>
                    <CRow>
                        <CInput type="text" id="precio" className="card-input"  onChange={handleChange} value={new_package.precio} placeholder="" style={{background:'white', border: '0px'}}/>
                    </CRow>
                </CCol>
                <CCol sm="2">
                    <CRow>
                        <div className="card-title-column">
                            Fragil<div className="asterisk">&nbsp;*</div> 
                        </div>
                    </CRow>
                    <CRow>
                        <CSwitch className={'mx-1'} variant={'3d'} color={'success'}  id="fragil"  onChange={handleChange}  defaultChecked />
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

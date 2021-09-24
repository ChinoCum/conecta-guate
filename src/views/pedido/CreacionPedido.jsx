import React, { lazy, Fragment, useState} from 'react'
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

import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))


const CreacionPedido = () => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});

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

  return (
    <div className="creacion-pedido">
        {(step === 0) ? 
        <Step1 changeStep={setStep} handleChange={handleChange} />
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
                        <ul id="progressbar">
                            <li className="active" id="first"><strong></strong></li>
                            <li id="second"><strong></strong></li>
                            <li id="third"><strong></strong></li>
                        </ul>
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
                                    <CInput onChange={props.handleChange} className="card-input" id="origin" data-end="t" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Nombre de empresa</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput onChange={props.handleChange} className="card-input" id="name_company" placeholder="" required />
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
                                    <CInput onChange={props.handleChange} className="card-input" id="phone_number" placeholder="" required />
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
                                    <CInput onChange={props.handleChange} className="card-input" id="email" placeholder="" required />
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
                                    <CInput onChange={props.handleChange} className="card-input" id="municipio" placeholder="" required />
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
                                    <CInput onChange={props.handleChange} className="card-input" id="address" placeholder="" required />
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
                                    <CInput onChange={props.handleChange} className="card-input" id="recibe" data-end="t" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Nombre de contacto</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput onChange={props.handleChange} className="card-input" id="name_contact" placeholder="" required />
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
                                    <CInput onChange={props.handleChange} className="card-input" id="phone_number_contact" placeholder="" required />
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
                                    <CInput onChange={props.handleChange} className="card-input" id="email_contact" placeholder="" required />
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
                                    <CInput onChange={props.handleChange} className="card-input" id="municipio_contact" placeholder="" required />
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
                                    <CInput onChange={props.handleChange} className="card-input" id="address_contact" placeholder="" required />
                                </CCol>   
                            </CFormGroup>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs="12">
                            <CFormGroup row>
                                <CCol xs="12" md="3">
                                    <CLabel htmlFor="text-input">Referencias de dirección</CLabel><CLabel htmlFor="text-input" style={{color:'#cdde0c'}}>*</CLabel>
                                </CCol>
                                <CCol xs="12" md="9">
                                    <CInput onChange={props.handleChange} className="card-input" id="ref_address_contact" placeholder="" required />
                                </CCol>
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
            <br/>

            <div className="creacion-pedido-button-envio">
                <CRow>
                    <CCol sm="3">
                        <div className="creacion-pedido-button-title">
                            <h4>¿Quién pagará el envío:</h4>
                        </div>
                        
                    </CCol>
                    <CCol sm="3">
                        <CSwitch className={'mx-1'} variant={'3d'} color={'success'}  size={"lg"} defaultChecked />
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
                                        props.changeStep(1);
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
    return (
        <>
            <div className="creacion-pedido-progress-bar">
                <CRow>
                    <CCol sm="9">
                    </CCol>
                    <CCol sm="3">
                        <ul id="progressbar">
                            <li className="active" id="first"><strong></strong></li>
                            <li className="active" id="second"><strong></strong></li>
                            <li id="third"><strong></strong></li>
                        </ul>
                    </CCol>
                </CRow>

                <CCard className="creacion-pedido-card">
                    <CCardBody className="card-body">
                        <CRow>
                            <CCol sm="12">
                                <div className="card-title-step2">
                                    <h3>Paquetes</h3>
                                </div>
                            </CCol>
                        </CRow>

                        
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                        <RowPackage />
                    </CCardBody>
                </CCard>

                <CCard className="creacion-pedido-card">
                    <CCardBody className="card-body">
                        <CRow>
                            <CCol sm="8">
                                <div className="card-title">
                                    <h3>¿Es servicio pago contra entrega (COD)?</h3>
                                </div>
                                <div className="card-body-step2">
                                    Al elegir servicio COD, su mercadería es cobrada en el destino. El monto se acreditará en su cuenta bancaria con un recargo del 4% del valor declarado y será descontado del monto a cobrar.
                                </div>
                            </CCol>
                        </CRow>
                        <CRow className="creacion-pedido-seguro-section">
                            <CCol sm="8">
                                <div className="card-title">
                                    <h3>¿Deseas seguro adicional?</h3>
                                </div>
                                <CFormGroup>
                                    <CInput className="card-input" id="seguro" placeholder="monto a asegurar" required />
                                </CFormGroup>
                                <div className="card-body-step2">
                                    Toda la mercadería está asegurada por un monto de hasta Q.500.00. Sin embargo puedes optar por asegurarla por un monto mayor con un recargo del 2%.
                                </div>
                            </CCol>
                        </CRow>
                        <br/>
                        <CRow>
                            <CCol sm="5">
                                <div className="card-title">
                                    <h3>Tengo un cupón</h3>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="5">
                                <CFormGroup>
                                    <CInput className="card-input" id="codigo" placeholder="añadir código" required />
                                </CFormGroup>
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
                        <CCol sm="8">
                        </CCol>
                        <CCol sm="2">
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
                        <ul id="progressbar">
                            <li className="active" id="first"><strong></strong></li>
                            <li className="active" id="second"><strong></strong></li>
                            <li className="active" id="third"><strong></strong></li>
                        </ul>
                    </CCol>
                </CRow>

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

            </div>
        </>
    )
}


const RowPackage = (props) => {

    return(
        <>
            <CRow className="card-row-titles">
                <CCol sm="3">
                    <div className="card-title-column">
                        Descripción 
                    </div>
                </CCol>
                <CCol sm="2">
                    <div className="card-title-column">
                        Tipo de transporte<div className="asterisk">&nbsp;*</div>
                    </div>
                </CCol>
                <CCol sm="1">
                    <div className="card-title-column">
                        Peso<div className="asterisk">&nbsp;*</div>
                    </div>
                </CCol>
                <CCol sm="2">
                    <div className="card-title-column">
                        Valor declarado<div className="asterisk">&nbsp;*</div>
                    </div>
                </CCol>
                <CCol sm="1">
                    <div className="card-title-column">
                        Fragil<div className="asterisk">&nbsp;*</div>
                    </div>
                </CCol>
                <CCol sm="1">
                    <div className="card-title-column">
                        &nbsp;
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="3">
                    Un paquete
                </CCol>
                <CCol sm="2">
                    Montocicleta
                </CCol>
                <CCol sm="1">
                    20 Lbs
                </CCol>
                <CCol sm="2">
                    Q. 45.00
                </CCol>
                <CCol sm="1">
                    <CSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked />
                </CCol>
                <CCol sm="1">
                    <CIcon 
                        style={{color: 'red', width: '1.5rem', height: '1.5rem', fontSize: '1.5rem'}}
                        name="cil-x-circle" 
                    />
                </CCol>
            </CRow>
        </>
    ) 
}


export default CreacionPedido

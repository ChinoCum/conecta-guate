import React, {
    useEffect,
    useState
} from 'react'
import { 
    useHistory,
    useRouteMatch,
    useParams
} from "react-router-dom";
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CJumbotron,
    CRow,
    CImg,
    CAlert
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

function TrackingInformation(props) {
    const match = useRouteMatch();
    let { id } = useParams();
    const [info, setInfo] = useState(null)
    const [step_classes, setStepClasses] = useState(null)

    useEffect(()=>{
        
        console.log("Id:", id);
        const config = {};
        axios.get( `https://ws.conectaguate.com/api/v1/tracking/?clave=${id}`, config,).then(
        (result) => {
            let res = result.data;
            let classes = {};
            // res.pedido.estado_pedido = 'almacen';
            // cancelado
            // liquidado
            // devolucion
            // recibido
            // almacen
            // transito
            // completada
            setInfo({...res.pedido})
            if(res.pedido.estado_pedido === 'completada'){
                classes.step1 = "stepper-item completed"
                classes.step2 = "stepper-item completed"
                classes.step3 = "stepper-item completed"
                classes.step4 = "stepper-item completed"
                classes.step1_img = "completed"
                classes.step2_img = "completed"
                classes.step3_img = "completed"
                classes.step4_img = "completed"
            }else if(res.pedido.estado_pedido === 'transito'){
                classes.step1 = "stepper-item completed"
                classes.step2 = "stepper-item completed"
                classes.step3 = "stepper-item active"
                classes.step4 = "stepper-item "
                classes.step1_img = "completed"
                classes.step2_img = "completed"
                classes.step3_img = "active"
                classes.step4_img = "completed-hold"
            }else if(res.pedido.estado_pedido === 'almacen'){
                classes.step1 = "stepper-item completed"
                classes.step2 = "stepper-item active"
                classes.step3 = "stepper-item "
                classes.step4 = "stepper-item "
                classes.step1_img = "completed"
                classes.step2_img = "active"
                classes.step3_img = "completed-hold"
                classes.step4_img = "completed-hold"
            }else if(res.pedido.estado_pedido === 'recibido'){
                classes.step1 = "stepper-item active"
                classes.step2 = "stepper-item "
                classes.step3 = "stepper-item "
                classes.step4 = "stepper-item "
                classes.step1_img = "active"
                classes.step2_img = "completed-hold"
                classes.step3_img = "completed-hold"
                classes.step4_img = "completed-hold"
            }else if(res.pedido.estado_pedido === 'devolucion'){
                classes.step1 = "stepper-item completed"
                classes.step2 = "stepper-item completed"
                classes.step3 = "stepper-item active"
                classes.step4 = "stepper-item "
                classes.step1_img = "completed"
                classes.step2_img = "completed"
                classes.step3_img = "active"
                classes.step4_img = "completed-hold"
            }else if(res.pedido.estado_pedido === 'liquidado'){
                classes.step1 = "stepper-item completed"
                classes.step2 = "stepper-item completed"
                classes.step3 = "stepper-item completed"
                classes.step4 = "stepper-item completed"
                classes.step1_img = "completed"
                classes.step2_img = "completed"
                classes.step3_img = "completed"
                classes.step4_img = "completed"
            }else if(res.pedido.estado_pedido === 'cancelado'){
                classes.step1 = "stepper-item completed"
                classes.step2 = "stepper-item completed"
                classes.step3 = "stepper-item completed"
                classes.step4 = "stepper-item "
                classes.step1_img = "completed"
                classes.step2_img = "completed"
                classes.step3_img = "completed"
                classes.step4_img = "completed-hold"
            }
            setStepClasses({...classes})
            console.log("data info", res);
        },
        (error) => {
            if (error.response) {
                console.log(error.response);
            }
        });
    },[]);

    const info_keys = {
        created_at: 'Fecha',
        updated_at: 'Actualización',
        id_orden: 'Orden',
        guia: 'Guía',
        estado_pedido: 'Estado',
        nombre_destinatario: 'Destinatario',
        nombre_tienda: 'Tienda',
        telefono_destinatario: 'Telefono destino',
        forma_pago: 'Pago',
        municipio_destino: 'Destino'
       
    }

    const info_keys_full_rows = {
        direccion_envio: 'Direccion de entrega',
        descripcion_producto: 'Descripción de producto',
        comentarios: 'Comentarios'
    }
    
    useEffect(()=>{
        console.log(step_classes);
    },[step_classes])
    

    return (
        (info && step_classes)?
        <>
            <CContainer className="tracking-info mt-5 mb-5">
                <CRow className="justify-content-md-center mb-3">
                    {/* <CCol lg="1"></CCol> */}
                    <CCol className="col-md-auto">
                        <h1 className="title">
                            Tracking
                        </h1>
                    </CCol>
                    {/* <CCol lg="1"></CCol> */}
                </CRow>
                <CRow className="mb-3">
                    <CCol sm="12">
                        <div className="stepper-wrapper">
                            <div className={step_classes.step1}>
                                <div className="step-counter">
                                    <CImg
                                        src={`img/icons/tracking/icon-1-${step_classes.step1_img}.svg`}
                                        fluid
                                        style={{height: (step_classes.step1_img !== 'completed-hold') ? '120px': '80px'}}
                                    />
                                </div>
                                <div className="step-name">Recibido</div>
                            </div>
                            <div  className={step_classes.step2}>
                                <div className="step-counter">
                                    <CImg
                                        src={`img/icons/tracking/icon-2-${step_classes.step2_img}.svg`}
                                        fluid
                                        style={{height: (step_classes.step2_img !== 'completed-hold') ? '120px': '80px'}}
                                    />
                                </div>
                                <div className="step-name">Recolectado</div>
                            </div>
                            <div className={step_classes.step3}>
                                <div className="step-counter">
                                    <CImg
                                        src={`img/icons/tracking/icon-3-${step_classes.step3_img}.svg`}
                                        fluid
                                        style={{height: (step_classes.step3_img !== 'completed-hold') ? '120px': '80px'}}
                                    />
                                </div>
                                <div className="step-name">En Transito</div>
                            </div>
                            <div  className={step_classes.step4}>
                                <div className="step-counter">
                                    <CImg
                                        src={`img/icons/tracking/icon-4-${step_classes.step4_img}.svg`}
                                        fluid
                                        style={{height: (step_classes.step4_img !== 'completed-hold') ? '120px': '80px'}}
                                    />
                                </div>
                                <div className="step-name">Entregado</div>
                            </div>
                        </div>
                    </CCol>
                </CRow>
                <CRow className="justify-content-md-center mb-3"
                    style={{display: (info.estado_pedido === 'cancelado' || info.estado_pedido === 'devolucion')? 'flex':'none'}}
                >
                    <CCol sm="12" lg="10">
                        <CAlert className="tracking-info-alert" color="info">
                            Retornado al almacen
                        </CAlert>
                    </CCol>
                </CRow>
                <CRow className="justify-content-md-center mb-3">
                    <CCol sm="12" lg="10">
                        <CCard className="tracking-card">
                            {
                                Object.entries(info_keys).map(
                                    ([key, value], index) => {
                                        let array_data = Object.entries(info_keys);
                                        if(!(index % 2)){
                                            if(array_data[index+1] !== undefined){
                                                return  <RowData left_data={array_data[index]} right_data={array_data[index+1]} info_keys={info_keys} data={info} key={`${index}-row`}/>
                                            }
                                        }
                                    }
                                )
                            }
                            {
                                Object.entries(info_keys_full_rows).map(
                                    ([key, value], index) => {
                                        return  <FullRowData data_key={key} info_keys={info_keys_full_rows} data={info} key={`${index}-full-row`}/>
                                    }
                                )
                            }
                            <br/>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow className="justify-content-md-center mb-3">
                    <CCol sm="12" lg="10">
                        <CRow>
                            <CCol sm="10" lg="10">
                                <p style={{textAlign: 'right'}}>Si necesitas más infomacion sobre tu paquete</p>
                            </CCol>
                            <CCol>
                                <CButton style={{backgroundColor:'#94be00'}}className="btn-conecta-wa btn-brand mr-1 mb-1"><span className="mfs-2" style={{color:'white'}}>Click Aqui</span></CButton>
                            </CCol>
                           
                        </CRow>
                    </CCol>
                </CRow>

                <CRow className="justify-content-md-center mb-4">
                    {/* <CCol lg="1"></CCol> */}
                    <CCol className="col-md-auto">
                        <h4 className="title-related-products">
                            Tambien te puede interesar
                        </h4>
                    </CCol>
                    {/* <CCol lg="1"></CCol> */}
                </CRow>

                <CRow className="justify-content-md-center mb-3">
                    <CCol xs="12" sm="4" md="3">
                        <CCard style={{border:'0px', paddingLeft:'1rem', paddingRight: '1rem'}}>
                            <CCardBody className="background-image-card-3">
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol xs="12" sm="4" md="3">
                        <CCard style={{border:'0px', paddingLeft:'1rem', paddingRight: '1rem'}}>
                            <CCardBody className="background-image-card-2">
                            </CCardBody>
                        </CCard>
                    </CCol>
                    <CCol xs="12" sm="4" md="3">
                        <CCard style={{border:'0px', paddingLeft:'1rem', paddingRight: '1rem'}}>
                            <CCardBody className="background-image-card">
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
               
            </CContainer>
        </>:null
    )
}

const RowData = (props) => {
    return(
        <CRow className="p-2">
            <CCol>
                <CRow className="ml-4">
                    <h6 className="key-info">{props.info_keys[props.left_data[0]]}: </h6> <h6 className="value-info">{props.data[props.left_data[0]]}</h6>
                </CRow>
            </CCol>
            <CCol>
                <CRow className="ml-4">
                <h6 className="key-info">{props.info_keys[props.right_data[0]]}: </h6> <h6 className="value-info">{props.data[props.right_data[0]]}</h6>
                </CRow>
            </CCol>
        </CRow>
    )
}


const FullRowData = (props) => {
    return(
        <CRow className="p-2">
            <CCol>
                <CRow className="ml-4">
                    <h6 className="key-info">{props.info_keys[props.data_key]}: </h6> <h6 className="value-info">{props.data[props.data_key]}</h6>
                </CRow>
            </CCol>
        </CRow>
    )
}


export default TrackingInformation


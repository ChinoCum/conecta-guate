import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CJumbotron,
    CRow,
    CEmbed,
    CEmbedItem,
    CInput,
    CInputGroup,
    CInputGroupText,
    CInputGroupPrepend,
    CInputGroupAppend,
    CFormGroup,
    CLabel,
    CTextarea,
    CImg
  } from '@coreui/react';
import Planes from './Planes';
import Plans from '../home/Plans';

function PlanesInfo(props) {
    const [images, setImages] = useState({
        free: 'img/icons/planes/mundo.svg',
        pro: 'img/icons/planes/estrella.svg',
        startup: 'img/icons/planes/mundo-bandera.svg',
        premium: 'img/icons/planes/diamante.svg'
    })

    const [plan, setPlan] = useState({
        free: 'Si te pasas al servicio Conecta Free, se cancelará tu plan Pro y ya no podrás contar con los beneficios que has adquirido.',
        pro: 'Cliente frecuente con precios especiales, incluye 5 viajes en la ciudad capital o zonas aledañas, más activacion de cross selling, 3 devoluciones',
        startup: 'Cliente frecuente con precios especiales, incluye 5 viajes en la ciudad capital al comprar tu primer pack.',
        premium: 'Cliente frecuente con precios especiales, incluye 10 viajes en la ciudad capital o zonas aledañas, más activación de cross selling, más adición al marketplace conecta, más ecommerce, más 3 devoluciones'
    })

    
    const [planPrice, setPlanrice] = useState({
        free: 'Q 0.00',
        pro: 'Q 149.00',
        startup: 'Q 99.00',
        premium: 'Q 299.00',
    })

    const [planSelected, setPlanSelected] = useState({
        free: false,
        pro: false,
        startup: false,
        premium: false
    });

    const onChangePlan = (name) =>{
        let plans;
        switch(name){
            case 'free':
                plans = {
                    free: true,
                    pro: false,
                    startup: false,
                    premium: false
                }
                break;
            case 'pro':
                plans = {
                    free: false,
                    pro: true,
                    startup: false,
                    premium: false
                }
                break;
            case 'startup':
                plans = {
                    free: false,
                    pro: false,
                    startup: true,
                    premium: false
                }
                break;
            case 'premium':
                plans = {
                    free: false,
                    pro: false,
                    startup: false,
                    premium: true
                }
                break;
            default:
                plans = {
                    free: false,
                    pro: false,
                    startup: false,
                    premium: false
                }
        }

        setPlanSelected(plans);
    }

    return (
        <>  
            <CContainer className="planes-info"> 
                {/* <CRow className="planes-title">
                    <CCol>
                        Cambiar plan
                    </CCol>
                </CRow> */}
                <br/>
                <CardPlan 
                    img={images.free} 
                    subtitle={"Free"}
                    description={plan.free}    
                    active={planSelected.free}
                    changePlan={onChangePlan}
                    plan={"free"}
                    price={planPrice.free}
                />
                <br/>
                <CardPlan 
                    img={images.pro} 
                    subtitle={"Pro"}
                    description={plan.pro}    
                    active={planSelected.pro}
                    changePlan={onChangePlan}
                    plan={"pro"}
                    price={planPrice.pro}
                />
                <br/>
                <CardPlan 
                    img={images.startup} 
                    subtitle={"Startup"}
                    description={plan.startup}    
                    active={planSelected.startup}
                    changePlan={onChangePlan}
                    plan={"startup"}
                    price={planPrice.startup}
                />
                <br/>
                <CardPlan 
                    img={images.premium} 
                    subtitle={"Premium"}
                    description={plan.premium}    
                    active={planSelected.premium}
                    changePlan={onChangePlan}
                    plan={"premium"}
                    recommended={true}
                    price={planPrice.premium}
                />
                <br />
            </CContainer>
        </>
    )
}


function CardPlan(props){
    return(
        <>
            <CRow className="recomendado-label" style={{display:(props.recommended)? 'block':'none'}}> Recomendado </CRow>
            <CRow className="actual-plan" style={{display:(props.active)? 'block':'none'}}><CCol> Plan Actual</CCol> </CRow>
            <CRow className={props.recommended ? "plan-card plan-card-recommended": "plan-card"}>
                <CCol>
                    <CCard className="plan-inner-card">
                        <CCardBody>
                            <CRow className="align-items-center">
                                <CCol sm="3">
                                    <CRow>
                                        <CImg 
                                            src={props.img}
                                            className="diamond-button"
                                            style={{
                                                width:'200px', 
                                                display:'block',
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }}
                                        />
                                    </CRow>
                                    <CRow className="subtitle-icon">
                                            {props.subtitle}
                                    </CRow>
                                </CCol>
                                <CCol sm="9">
                                    <CRow className="align-items-center description">
                                        {props.description}
                                    </CRow>
                                </CCol>
                            </CRow>
                            <CRow className="align-items-end">
                                <CCol sm="3">
                                </CCol>
                                <CCol sm="9">
                                    <CRow>
                                        <CCol sm="6">
                                            <CRow className="left">
                                                <CCol>
                                                    <span  className="price">
                                                        {props.price}
                                                    </span><br/>
                                                    <span  className="month">
                                                    /mes
                                                    </span>
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                        <CCol sm="6">
                                            <CRow style={{float:'right'}}>
                                                <CButton
                                                    className="button-plan"  
                                                    color="secondary"
                                                    onClick={()=>{
                                                        props.changePlan(props.plan)
                                                    }}
                                                >
                                                    Seleccionar
                                                </CButton>
                                            </CRow>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

PlanesInfo.propTypes = {

}

export default PlanesInfo


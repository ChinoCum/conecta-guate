import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
    CCollapse,
    CCardHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CNavbar,
    CNavbarNav,
    CNavbarBrand,
    CNavbarText,
    CToggler,
    CNavLink,
    CDropdown,
    CForm,
    CImg,
    CNavItem,
    CDropdownDivider,
    CFooter,
    CLink
  } from '@coreui/react'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import CIcon from '@coreui/icons-react'

function PublicFooter(props) {
    return (
        <CFooter>
            <CContainer className="footer-container">
                <CRow>
                    <CCol lg="8">
                        <CRow>
                            <CCol lg="4">
                               <LinkFooter name="FAQs" link="/faqs"/> 
                               <LinkFooter name="Cobertura" link="/cobertura"/> 
                               <LinkFooter name="Nosotros" link="/nosotros"/> 
                            </CCol>
                            <CCol lg="4">
                                <LinkFooter name="Bolsa de empleo" link="/bolsa-de-empleo"/> 
                                <LinkFooter name="Comercios" link="/comercios"/> 
                                <LinkFooter name="Contacto" link="/contacto"/> 
                            </CCol>
                            <CCol lg="4">
                                <LinkFooter name="15 ave 'A' 21-13 Zona 13" external={true} link="https://www.google.com/maps/place/Conecta/@14.6104537,-90.5005334,15z/data=!4m5!3m4!1s0x0:0x4c595030980a1a89!8m2!3d14.6104537!4d-90.5005334"/> 
                                <LinkFooter name="(502) 2306-9030" disabled={true} link=""/> 
                                <LinkFooter name="info@conectaguate.com" disabled={true} link=""/> 
                            </CCol>
                        </CRow>
                    </CCol>
                    <CCol lg="4">
                        <CRow>
                            <CCol lg="12" className="col-social-icons">
                                <CImg 
                                    className="social-icons"
                                    src="/img/icons/facebook.svg"
                                    onClick={()=>{
                                        window.open('https://www.facebook.com/ConectaGuateOficial/', '_blank').focus();
                                    }}
                                />
                                <CImg 
                                    className="social-icons"
                                    src="/img/icons/instagram.svg"
                                />
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CContainer>
        </CFooter>
    )
}

const LinkFooter = (props) =>{
    const new_tab = (props.external) ? true :false;
    const disabled = (props.disabled) ? true : false;
    return (
        <CRow>
            {(props.external)?
                <CLink 
                    className="link-item" 
                    href={`${props.link}`}
                    target={(new_tab)? "_blank" : ""}
                    disabled={(disabled)? true : false}
                >
                    {props.name}
                </CLink>
            :
                <CLink 
                    className="link-item" 
                    to={`${props.link}`}
                    disabled={(disabled)? true : false}
                >
                    {props.name}
                </CLink>
            }
        </CRow>
    )
}

export default PublicFooter


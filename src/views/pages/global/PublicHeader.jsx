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
  } from '@coreui/react'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
  import CIcon from '@coreui/icons-react'

function PublicHeader(props) {

    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <CNavbar expandable="sm" className="home-header">
          <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
          <CNavbarBrand>
              <CImg 
                src={"img/logo_conecta.png"}
                fluid
                className="home-header-logo"
              />
          </CNavbarBrand>
          <CCollapse show={isOpen} navbar>
            <CNavbarNav>
             
            </CNavbarNav>
            <CNavbarNav className="ml-auto home-header-options" >
                <CNavLink className="home-header-options-item">Inicio</CNavLink>
                <CNavLink className="home-header-options-item">Comercio</CNavLink>
                <CNavLink className="home-header-options-item">Planes</CNavLink>
                <CNavLink className="home-header-options-cta">Hacer un envío</CNavLink>
                <CNavLink className="home-header-options-account">
                    <FontAwesomeIcon 
                    icon={faUserCircle}  
                    style={{marginRight:'.3rem'}} 
                    size="lg"
                    />
                    Cuenta
                </CNavLink>
            </CNavbarNav>
          </CCollapse>
        </CNavbar>
      </div>
    )

}


export default PublicHeader


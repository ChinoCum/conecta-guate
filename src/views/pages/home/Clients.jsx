import React from 'react'
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
  } from '@coreui/react'
  import { DocsLink } from 'src/reusable'
  import CIcon from '@coreui/icons-react'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'


function Clients(props) {
    let row_clients_1 = ['logo-aquacity','logo-ciclon','logo-foodservice','logo-minegocioenlinea'];
    let row_clients_2 = ['logo-pcr','logo-regus','logo-universales','logo-worx'];
    return (
        <>
            <CContainer className="home-clients">
                <CRow className="align-items-center">
                    <CCol>
                        <h3 className="title">
                            Clientes Satisfechos
                        </h3>
                    </CCol>
                </CRow>
                <CRow className="align-items-center clients-sections">
                    <CRow className="align-items-center row-clients">
                        {row_clients_1.map((elem)=>{
                            return <SingleClient key={elem} img={elem}/>
                        })}
                    </CRow>
                    <CRow className="align-items-center row-clients">
                        {row_clients_2.map((elem)=>{
                            return <SingleClient key={elem} img={elem}/>
                        })}
                    </CRow>
                </CRow>
                <CRow className="align-items-center">
                    <CCol>
                        <h4 className="subtitle">
                            ...Y muchos emprendedores que conectan su negocio a toda Guatemala con nuestros servicios.
                        </h4>
                    </CCol>
                </CRow>
            </CContainer>
        </>
    )
}

const SingleClient = (props) => {
    const links = {
        'logo-aquacity': 'https://acqua-city.com/',
        'logo-ciclon': 'https://productosciclon.com/',
        'logo-foodservice': 'https://foodservice502.com.gt/',
        'logo-minegocioenlinea': 'https://minegocioenlinea.com/',
        'logo-pcr': 'https://www.ratingspcr.com/',
        'logo-regus': 'https://www.regus.com/en-us',
        'logo-universales': 'https://www.universales.com/',
        'logo-worx': 'https://www.worx.com/',
    }
    return (
        <CCol sm="3" className="container-client-img">
            <CImg fluid
                className="client-img"
                src={`img/clients/${props.img}.png`}
                onClick={()=>{
                    window.open(links[props.img], '_blank').focus();
                }}
            />
        </CCol>
    )
}

export default Clients


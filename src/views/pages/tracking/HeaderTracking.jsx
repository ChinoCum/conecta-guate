import React, {useState, useEffect} from 'react'
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
    CTextarea
  } from '@coreui/react'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  import { ToastProvider, useToasts } from 'react-toast-notifications';
  import axios from 'axios'
  import { useHistory } from "react-router-dom";

function HeaderTracking(props) {
    const history = useHistory();


    const [guia, setGuia] = useState("")
    const { addToast } = useToasts();

    useEffect(()=>{
        setGuia("");
    },[])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setGuia(value);
    }

    const searchGuia = async () =>{
        let guia_without_space = guia.trim();
        let guia_existe = await getGuiaInfo(guia_without_space);
        if(guia_existe && guia_without_space.length > 0){
            addToast('Guia Encontrada', { 
                appearance: 'info', 
                autoDismiss : true ,
                autoDismissTimeout : 3000
            });
            history.push({
                pathname: `/tracking/${guia_without_space}`,
                state: { id: guia_without_space}
            });
            window.location.reload();
        }else{
            addToast("Guia no valida", { 
                appearance: 'error', 
                autoDismiss : true ,
                autoDismissTimeout : 3000
            });
        }
    }

    const getGuiaInfo = async (id) =>{
        const config = {};
        return await axios.get( `https://ws.conectaguate.com/api/v1/site/pedidio/guia/${id}`, config).then(
            (result) => {
                return result.data.existe;
        });
    }

    return (
        <>
         <CRow className="tracking-slider">
            <CCol lg="12"  className="col-slider">
                <CCard className="tracking-slider-card">
                    {/* <CCardBody> */}
                    <CJumbotron 
                    className="border tracking-slider-background" 
                    >   
                        <CContainer className="tracking-slider-container">
                            <CRow className="align-items-end row-tracking">
                                <CCol lg="4" className="align-self-end">
                                    <h1 className="display-3 title">
                                        ??D??nde est?? <br/>
                                        mi paquete?
                                    </h1>
                                </CCol>
                                    <CCol lg="8" className="align-self-end search-input">
                                    <CInputGroup className="mb-1 input-tracker">
                                        <CInput 
                                            value={guia}
                                            name="guia"
                                            type="text" 
                                            placeholder="" 
                                            style={{
                                                background:'white', 
                                                border: '0px',
                                                fontSize: '1.5rem'
                                            }}
                                            onChange={handleChange}
                                        />
                                        <CInputGroupAppend
                                            onClick={()=>{
                                                searchGuia();
                                            }}
                                            style={{cursor:'pointer'}}
                                            >
                                            <CInputGroupText>
                                            <FontAwesomeIcon 
                                                icon={faSearch}  
                                                style={{marginRight:'.3rem'}} 
                                                size="2x"
                                            />
                                                </CInputGroupText>
                                        </CInputGroupAppend>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                        </CContainer>
                    </CJumbotron>
                </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default HeaderTracking


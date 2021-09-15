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
  import { DocsLink } from 'src/reusable'
  import CIcon from '@coreui/icons-react'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  import { ToastProvider, useToasts } from 'react-toast-notifications';

function SliderTracking(props) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        product: "",
        phone: "",
        message: ""
    });


    const [guia, setGuia] = useState("")
    const { addToast } = useToasts();

    useEffect(()=>{
        setGuia("");
        setForm({
            name: "",
            email: "",
            product: "",
            phone: "",
            message: ""
        });
    },[])

    // useEffect(()=>{
    //     console.log(form);
    // },[form])
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setGuia(value);
    }

    const handleChangeForm = (e) =>{
        const {id, value} = e.target;
        const form_object = JSON.parse(JSON.stringify(form));
        let new_form = {
            ...form_object,
            [id]: value
        };
        setForm(new_form);
    }

    const searchGuia = () =>{
        let guia_without_space = guia.trim();
        if(guia_without_space.length === 27){
            addToast(guia_without_space, { 
                appearance: 'info', 
                autoDismiss : true ,
                autoDismissTimeout : 3000
            });
        }else{
            addToast("Guia no valida", { 
                appearance: 'error', 
                autoDismiss : true ,
                autoDismissTimeout : 3000
            });
        }
    }

    const onSubmit = () =>{
        let error = false;
        let labels = {
            name: "Nombre",
            email: "Correo Electrónico",
            product: "Producto",
            phone: "Teléfono",
            message: "Mensaje"
        };

        for (const [key, value] of Object.entries(form)) {
            if(value.length === 0){
                addToast(`El campo ${labels[key]} es requerido`, { 
                    appearance: 'error', 
                    autoDismiss : true ,
                    autoDismissTimeout : 4000
                });
                error = true;
            }
            if(key === "email"){
                const em = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!em.test(String(value).toLowerCase())){
                    addToast(`El Correo Electrónico no es valido`, { 
                        appearance: 'error', 
                        autoDismiss : true ,
                        autoDismissTimeout : 4000
                    });
                    error = true;
                }
            }
            if(key === "phone"){
                const te = /^[-\s\.]?[0-9]{4}[-\s\.]?[0-9]{4}$/im;
                if(!te.test(String(value).toLowerCase())){
                    addToast(`El Numero Telefonico no es valido`, { 
                        appearance: 'error', 
                        autoDismiss : true ,
                        autoDismissTimeout : 4000
                    });
                    error = true;
                }
            }
        }

        if(!error){
            addToast(`Pronto nos comunicaremos contigo`, { 
                appearance: 'success', 
                autoDismiss : true ,
                autoDismissTimeout : 4000
            });
            setTimeout(function(){ 
                setForm({
                    name: "",
                    email: "",
                    product: "",
                    phone: "",
                    message: ""
                });
            }, 1000);
        }
    }

    return (
        <>
         <CRow className="home-slider">
            <CCol lg="8"  className="col-slider">
                <CCard className="home-slider-card">
                    {/* <CCardBody> */}
                    <CJumbotron 
                    className="border home-slider-background" 
                    // style={{paddingTop:'10rem'}}
                    >   
                        <CContainer className="home-slider-container">
                            <CRow className="align-items-end row-tracking">
                                <CCol lg="5" className="align-self-end">
                                    <h1 className="display-3 title">
                                        ¿Dónde está <br/>
                                        mi paquete?
                                    </h1>
                                </CCol>
                                    <CCol lg="7" className="align-self-end search-input">
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
            <CCol lg="4" className="col-form">
                <CCard className="home-form">
                    <CCardBody >
                        <CRow className="justify-content-md-center">
                            <CCol>
                                <h3
                                    className="title"
                                >Quiero Conectarme:</h3>
                            </CCol>
                        </CRow>
                        {/* <form> */}
                        <CFormGroup>
                            <CInput value={form.name} id="name" type="text" onChange={handleChangeForm} placeholder="Nombre Completo" required/>
                        </CFormGroup>
                        <CFormGroup>
                            <CInput value={form.email} id="email" type="email" onChange={handleChangeForm} placeholder="Correo electrónico" required/>
                        </CFormGroup>
                        <CFormGroup>
                            <CInput value={form.product} id="product" onChange={handleChangeForm} placeholder="Tu producto: ej. ropa, comida, etc" required/>
                        </CFormGroup>
                        <CFormGroup>
                            <CInput value={form.phone} id="phone" type="tel" onChange={handleChangeForm} placeholder="Teléfono: 0000-0000" pattern="[0-9]{4}-[0-9]{4}" required/>
                        </CFormGroup>
                        <CFormGroup>
                            <CTextarea 
                                name="message" 
                                id="message" 
                                rows="4"
                                placeholder="Escribe tu mensaje" 
                                value={form.message}
                                onChange={handleChangeForm}
                            />
                        </CFormGroup>
                        <CFormGroup className="form-actions" style={{marginBottom: '0'}}>
                            <CRow className="justify-content-md-center item-buttons">
                                <CCol className="col-md-auto">
                                    <CButton className="button" type="submit" size="lg" color="secondary" onClick={onSubmit}>Conectar</CButton>
                                </CCol>
                            </CRow>
                        </CFormGroup>
                        {/* </form> */}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        </>
    )
}

export default SliderTracking

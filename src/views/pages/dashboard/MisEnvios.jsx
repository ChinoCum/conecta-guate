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
    CSelect
  } from '@coreui/react'
  import { ToastProvider, useToasts } from 'react-toast-notifications';
  import { v4 as uuidv4 } from 'uuid';
  import axios from 'axios';
  import { 
      useHistory,
      useRouteMatch,
      useParams
  } from "react-router-dom";
  import { AgGridReact, AgGridColumn } from 'ag-grid-react';
  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
  import 'ag-grid-community/dist/styles/ag-theme-material.css';
  import CIcon from '@coreui/icons-react'


function MisEnvios(props) {
    const [column_definitions, setColumnDefinitions] = useState({
        columnDefs: [
            { headerName: 'Pedido', field: 'pedido' },
            { headerName: 'Destinatario', field: 'destinatario' },
            { headerName: 'Destino', field: 'destino' },
            { headerName: 'Tipo de envio', field: 'tipo_de_envio' },
            { headerName: 'Estado', field: 'estado' },
            { haederName: 'button_click',  field: 'button'}
        ],
        // rowData: []
        rowData: [
            { 
                pedido: '001', 
                destinatario: 'Nombre Apellido', 
                destino: 'Ciudad',
                tipo_de_envio: 'Pago contra entrega', 
                estado: 'En transito', 
                button:'' 
            },
            { 
                pedido: '002', 
                destinatario: 'Nombre Apellido', 
                destino: 'Ciudad',
                tipo_de_envio: 'Pago contra entrega', 
                estado: 'En transito', 
                button:'' 
            },
        ]
    });

    return (
        <>
        <div className="mis-envios-container">
                <CRow>
                    <CCol sm="12">
                        <CCard className="card-header">
                            <div className="mis-envios-title">
                                Monitorea tus pedidos
                            </div>
                        </CCard>    
                       
                    </CCol>
                </CRow>  
                <CRow className="filter-container">
                    <CCol sm="3" className="filter-row-responsive">
                        <CRow>
                            No. de Guía
                        </CRow>
                        <CRow>
                            <CInput 
                                type="text" 
                                id="guia" 
                                className="filter-container-input"  
                                value="test" 
                                placeholder="" 
                                style={{background:'white', border: '0px'}}
                            />
                        </CRow>
                    </CCol>
                    <CCol sm="3" className="filter-row-responsive">
                        <CRow>
                            Fecha de Inicio
                        </CRow>
                        <CRow>
                            <CInput 
                                type="text" 
                                id="fecha-ini" 
                                className="filter-container-input"  
                                value="test1" 
                                placeholder="" 
                                style={{
                                    background:'white', 
                                    border: '0px',
                                    textAlign: 'left'
                                }}
                                onChange={()=>{
                                    console.log('test');
                                }}
                            />
                        </CRow>
                    </CCol>
                    <CCol sm="3" className="filter-row-responsive">
                        <CRow>
                            Fecha de finalización
                        </CRow>
                        <CRow>
                            <CInput 
                                type="text" 
                                id="fecha-fin" 
                                className="filter-container-input"  
                                value="test2" 
                                placeholder="" 
                                style={{
                                    background:'white', 
                                    border: '0px',
                                    textAlign: 'left'
                                }}
                                onChange={()=>{
                                    console.log('test');
                                }}
                            />
                        </CRow>
                    </CCol>
                    <CCol sm="3">
                        <CRow className="row_button_filters">
                            <CCol col="6" sm="12" md="12" xl className="mb-3 mb-xl-0">
                                <CButton 
                                    block 
                                    className="button_filters"
                                    style={{
                                        background:'#f3bf34', 
                                    }}
                                    >   
                                        <CIcon 
                                            name="cil-search"
                                            style={{
                                                // background:'white',
                                                color:'white' 
                                            }}
                                        />
                                        Aplicar
                                </CButton>
                            </CCol>
                            <CCol col="6" sm="12" md="12" xl  className="mb-3 mb-xl-0"> 
                                <CButton 
                                    block 
                                    className="button_filters"
                                    style={{
                                        background:'#afc7ff', 
                                    }}>
                                        Exportar
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>  
                <CRow className="table-container">
                    <CCol sm="12">
                        <div id="myGrid" style={{height: '600px'}} className="ag-theme-material">
                        <AgGridReact 

                            // turn on AG Grid React UI
                            reactUi="true"
                            className="ag-theme-material"
                            // animateRows="true"
                            columnDefs={column_definitions.columnDefs}
                            rowData={column_definitions.rowData}
                            rowSelection="multiple"
                            groupSelectsChildren="true"
                            suppressRowClickSelection="true"
                            />
                        </div>
                    </CCol>
                </CRow>
        </div>
        </>
    )
}

MisEnvios.propTypes = {

}

export default MisEnvios


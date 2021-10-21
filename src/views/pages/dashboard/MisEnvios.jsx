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
  import CIcon from '@coreui/icons-react';
  import DatePicker from "react-datepicker";

  import "react-datepicker/dist/react-datepicker.css";
  import ButtonCellRenderer from './cell_renderer/ButtonCellRenderer'
import { use } from 'react-dom-factories';


function MisEnvios(props) {
    const [aggrid,  setAggrid] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [input_search, setInputSearch] = useState("");
    const [column_definitions, setColumnDefinitions] = useState({
        columnDefs: [
            { headerName: 'Pedido', field: 'pedido' },
            { headerName: 'Destinatario', field: 'destinatario' },
            { headerName: 'Destino', field: 'destino' },
            { headerName: 'Tipo de envio', field: 'tipo_de_envio' },
            { headerName: 'Estado', field: 'estado' },
            { 
                haederName: 'button_click',  
                field: 'button',
                cellRenderer: 'btnCellRenderer',
                cellRendererParams: {
                    clicked: function(field) {
                      alert(`${field} was clicked`);
                    },
                  },
            }
        ],
        // rowData: []
        rowData: [
            { 
                pedido: '001', 
                destinatario: 'Nombre 1 Apellido', 
                destino: 'Ciudad',
                tipo_de_envio: 'Pago contra entrega', 
                estado: 'En transito', 
                button:'' 
            },
            { 
                pedido: '002', 
                destinatario: 'Nombre 2 Apellido', 
                destino: 'Ciudad',
                tipo_de_envio: 'Pago contra entrega', 
                estado: 'En transito', 
                button:'' 
            },
            { 
                pedido: '003', 
                destinatario: 'Nombre 3 Apellido', 
                destino: 'Ciudad',
                tipo_de_envio: 'Pago contra entrega', 
                estado: 'En transito', 
                button:'' 
            },
            { 
                pedido: '004', 
                destinatario: 'Nombre 4 Apellido', 
                destino: 'Ciudad',
                tipo_de_envio: 'Pago contra entrega', 
                estado: 'En transito', 
                button:'' 
            },{ 
                pedido: '005', 
                destinatario: 'Nombre 5 Apellido', 
                destino: 'Ciudad',
                tipo_de_envio: 'Pago contra entrega', 
                estado: 'En transito', 
                button:'' 
            },
            { 
                pedido: '006', 
                destinatario: 'Nombre 6 Apellido', 
                destino: 'Ciudad',
                tipo_de_envio: 'Pago contra entrega', 
                estado: 'En transito', 
                button:'' 
            },
        ]
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInputSearch(value);
        onFilterTextBoxChanged();
    }

    const onGridReady = (params) =>{
        setAggrid({api: params.api, column_api:params.columnApi});
    }

    const onFilterTextBoxChanged = () => {
        aggrid.api.setQuickFilter(document.getElementById('guia').value);
    }

    const onBtnExport = () => {
        aggrid.api.exportDataAsCsv();
    };

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
                                value={input_search}
                                placeholder="" 
                                style={{background:'white', border: '0px'}}
                                onChange={handleChange}
                            />
                        </CRow>
                    </CCol>
                    <CCol sm="3" className="filter-row-responsive">
                        <CRow>
                            Fecha de Inicio
                        </CRow>
                        <CRow>
                            <DatePicker 
                                selected={startDate}
                                id="fecha-ini" 
                                className="filter-container-input form-control"  
                                onChange={(date) => setStartDate(date)} 
                                style={{
                                    background:'white', 
                                    border: '0px',
                                    textAlign: 'left'
                                }}
                             />
                        </CRow>
                    </CCol>
                    <CCol sm="3" className="filter-row-responsive">
                        <CRow>
                            Fecha de finalización
                        </CRow>
                        <CRow>
                            <DatePicker 
                                selected={endDate}
                                id="fecha-fin" 
                                className="filter-container-input form-control"  
                                onChange={(date) => setEndDate(date)} 
                                style={{
                                    background:'white', 
                                    border: '0px',
                                    textAlign: 'left'
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
                                    }}
                                    onClick={() => onBtnExport()}
                                    >
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
                            onGridReady={onGridReady}
                            frameworkComponents={{
                                btnCellRenderer: ButtonCellRenderer,
                            }}
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


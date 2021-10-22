import React, { lazy, Fragment, useState, useEffect, useRef} from 'react'
import {isMobile} from 'react-device-detect';
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
    CSelect,
    CImg
  } from '@coreui/react'
  import { ToastProvider, useToasts } from 'react-toast-notifications';
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
  import IdCellRenderer from './cell_renderer/IdCellRenderer'
  


function MisEnvios(props) {
    const size = useWindowSize();
    const [number_rows, setNumberRows] = useState("20");
    const [aggrid,  setAggrid] = useState(null);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [input_search, setInputSearch] = useState("");
    const [column_definitions, setColumnDefinitions] = useState({
        columnDefs: [
            { 
                headerName: 'Pedido', 
                field: 'pedido',
            },
            { 
                headerName: 'Destinatario', 
                field: 'destinatario' },
            { 
                headerName: 'Destino', 
                field: 'destino' },
            { 
                headerName: 'Tipo de envio', 
                field: 'tipo_de_envio' },
            { 
                headerName: 'Fecha de Creación', 
                field: 'fecha_creacion' },
            { 
                headerName: 'Fecha de Entrega', 
                field: 'fecha_entrega' },
            { 
                headerName: 'Estado', 
                field: 'estado',
                cellRenderer: 'idBtnCellRenderer',
                cellRendererParams: {
                    clicked: function(field) {
                    alert(`${field} was clicked`);
                    },
                }, 
            },
            { 
                haederName: '',  
                field: 'link',
                cellRenderer: 'btnCellRenderer',
                cellRendererParams: {
                    clicked: function(field) {
                      alert(`${field} was clicked`);
                    },
                  },
            }
        ],
        rowData: [],
        defaultColDef: {
            resizable: true,
        }
    });

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
      

    // Hook
    function useWindowSize() {
        // Initialize state with undefined width/height so server and client renders match
        // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
        const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
        });
        useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
        }, []); // Empty array ensures that effect is only run on mount
        return windowSize;
    }

    useEffect(()=>{
        let random = Math.floor(Math.random() * 1001);
        let row_data = [];
        let status = [
            'Cancelado',
            'Liquidado',
            'Devolucion',
            'Recibido',
            'Almacen',
            'Transito',
            'Completada',
            'Almacen',
            'Transito',
            'Completada',
        ];
        let current = 0;
        for(let i = 0; i < random; i++){
            let random_ini_date = randomDate(new Date(2012, 0, 1), new Date());
            let random_fin_date = randomDate(new Date(2012, 0, 1), new Date());

            var dd = String(random_ini_date.getDate()).padStart(2, '0');
            var mm = String(random_ini_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = random_ini_date.getFullYear();

            var dd2 = String(random_fin_date.getDate()).padStart(2, '0');
            var mm2 = String(random_fin_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy2 = random_fin_date.getFullYear();

            const date_ini_str =  dd + '/' + mm + '/' + yyyy;
            const date_fin_str =  dd2 + '/' + mm2 + '/' + yyyy2;

            let object ={ 
                pedido: `${i}`, 
                destinatario: `Nombre ${i} Apellido`, 
                destino: `Ciudad`,
                tipo_de_envio: `Pago contra entrega`, 
                estado: `${status[current]}`, 
                link: `${i}-pedido`,
                fecha_creacion: date_ini_str,
                fecha_entrega: date_fin_str
            };
            current = current + 1;
            if(current === 10){
                current = 0;
            }
            row_data.push(object);
        }
        setColumnDefinitions({
            ...column_definitions,
            rowData: row_data
        })
        setLoading(true);

    },[])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInputSearch(value);
        onFilterTextBoxChanged();
    }

    const onGridReady = (params) =>{
        setAggrid({api: params.api, column_api:params.columnApi});
        if(!isMobile || size > 992) {
            params.api.sizeColumnsToFit();
        }   
    }

    const onFilterTextBoxChanged = () => {
        aggrid.api.setQuickFilter(document.getElementById('guia').value);
    }

    const onBtnExport = () => {
        aggrid.api.exportDataAsCsv();
    };

    const onPageSizeChanged = () => {
        var value = document.getElementById('page-size').value;
        aggrid.api.paginationSetPageSize(Number(value));
        setNumberRows(value);
    };
    

    return (
        (loading) ?
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
                                onChange={(date) => {
                                    console.log(date);
                                    setStartDate(date)
                                }} 
                                style={{
                                    background:'white', 
                                    border: '0px',
                                    textAlign: 'left'
                                }}
                                maxDate={endDate}
                                dateFormat="dd/MM/yyyy"
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
                                onChange={(date) => {
                                    console.log(date);
                                    setEndDate(date)
                                }} 
                                style={{
                                    background:'white', 
                                    border: '0px',
                                    textAlign: 'left'
                                }}
                                minDate={startDate}
                                dateFormat="dd/MM/yyyy"
                             />
                        </CRow>
                    </CCol>
                    <CCol sm="3">
                        <CRow>
                        &nbsp;
                        </CRow>
                        <CRow className="row_button_filters">
                            <CCol col="6" sm="12" md="12" xl className="mb-3 mb-xl-0">
                                <CButton 
                                    block 
                                    className="button_filters"
                                    style={{
                                        background:'#f3bf34', 
                                        fontWeight: '500'
                                    }}
                                    >   
                                        <CRow>
                                            <CCol sm="3" 
                                                >
                                                <CImg
                                                src={`img/icons/mis-envios/buscar.svg`}
                                                fluid
                                                style={{width:'25px', cursor:'pointer'}}
                                            />
                                            </CCol>
                                            <CCol
                                                className="export_button">
                                                Aplicar
                                            </CCol>
                                        </CRow>
                                </CButton>
                            </CCol>
                            <CCol col="6" sm="12" md="12" xl  className="mb-3 mb-xl-0"> 
                                <CButton 
                                    block 
                                    className="button_filters"
                                    style={{
                                        background:'#afc7ff', 
                                        fontWeight: '500'
                                    }}
                                    onClick={() => onBtnExport()}
                                    >   
                                        <CRow>
                                            <CCol sm="3" 
                                                >
                                                <CImg
                                                    src={`img/icons/mis-envios/exportar.svg`}
                                                    fluid
                                                    style={{width:'25px', cursor:'pointer'}}
                                                />
                                            </CCol>
                                            <CCol
                                                className="export_button">
                                                Exportar
                                            </CCol>
                                        </CRow>
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>  
                <CRow className="table-container">
                    <CCol>
                        <select 
                            id="page-size"
                            className="card-input" 
                            onChange={() => onPageSizeChanged()} 
                            style={{
                                background:'white', 
                                border: '0px', 
                                color: '#768192',
                                marginLeft: '1rem',
                                padding: '.5rem',
                                borderRadius: '5px'
                            }} 
                            value={number_rows}
                        >
                            <option value="20">
                                20
                            </option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="1000">All</option>
                        </select>
                    </CCol>
                </CRow>
                <CRow className="table-container" style={{marginBottom: '2rem'}}>
                    <CCol sm="12">
                        <div id="myGrid" style={{height: '600px'}} className="ag-theme-material">
                        <AgGridReact 

                            // turn on AG Grid React UI
                            reactUi="true"
                            className="ag-theme-material"
                            animateRows="true"
                            columnDefs={column_definitions.columnDefs}
                            rowData={column_definitions.rowData}
                            rowSelection="multiple"
                            groupSelectsChildren="true"
                            suppressRowClickSelection="true"
                            onGridReady={onGridReady}
                            frameworkComponents={{
                                btnCellRenderer: ButtonCellRenderer,
                                idBtnCellRenderer: IdCellRenderer
                            }}
                            pagination={true}
                            paginationPageSize={10}
                            defaultColDef={column_definitions.defaultColDef}
                            />
                        </div>
                    </CCol>
                </CRow>
        </div>
        </> : <></>
    )
}

MisEnvios.propTypes = {

}

export default MisEnvios


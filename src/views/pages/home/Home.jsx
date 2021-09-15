import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import PublicHeader from '../global/PublicHeader'
import SliderTracking from './SliderTracking'
import Plans from './Plans'
import Sales from './Sales'
import Video from './Video'
import Clients from './Clients'
import PublicFooter from '../global/PublicFooter'

const Home = () => {
  return (
      <>
        <PublicHeader />
        <SliderTracking />
        <Plans />
        <Sales />
        <Video />
        <Clients />
        <PublicFooter />
      </>
    
  )
}

export default Home

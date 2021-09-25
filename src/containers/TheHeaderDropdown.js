import React, {useEffect, useState} from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';

const TheHeaderDropdown = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(()=>{
    const user_object = reactLocalStorage.getObject('user');
    console.log(user_object);
    if(user_object === 'undefined' || user_object === undefined || user_object === null || Object.keys(user_object).length === 0){
        history.push('/login');
    }else{
      if(!('name' in user_object)){
          console.log(user_object);
          const config = {
              headers: { Authorization: `Bearer ${user_object.token}` }
          };
        
          axios.get(
            'https://ws.conectaguate.com/api/auth/user',
            config,
          ).then(
            (result) => {
              setUser({
                ...user_object,
                name: result.data.name
              });
              reactLocalStorage.setObject('user', { 
                ...user_object,
                name: result.data.name
              });
              console.log("data user", result);
            },
            (error) => {
              if (error.response) {
                console.log(error.response);
              }
          });
      }else{
        setUser({
          ...user_object
        });
      }
    }
  },[])


  useEffect(()=>{
    if('name' in user){
      setLoading(true);
    }
  },[user])



  return (
    (loading) ?
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CIcon 
            name="cil-user" 
            customClasses="user-icon-header"
          />
        </div>
        <div className="username-conecta-header">
          {user.name.substring(0,7)}
        </div>
        <CIcon 
          style={{color:'#91b515 !important'}} 
          name="cil-chevron-bottom" 
          customClasses="drop-icon-header"
        />
        
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Cuenta</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Perfil
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Cambio de Contraseña
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={()=>{
          if('token' in user){
            reactLocalStorage.remove('user');
            history.push('/');
          }
        }}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Salir
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
    : null
  )
}

export default TheHeaderDropdown

import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = () => {
  return (
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
          Berenice Co. 
        </div>
        <CIcon 
          style={{color:'#91b515 !important'}} 
          name="cil-chevron-bottom" 
          customClasses="drop-icon-header"
        />
        
      </CDropdownToggle>
    </CDropdown>
  )
}

export default TheHeaderDropdown

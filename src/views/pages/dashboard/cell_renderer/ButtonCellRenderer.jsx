import React, { Component } from 'react'
import CIcon from '@coreui/icons-react';

export default class BtnCellRenderer extends Component {
    constructor(props) {
      super(props);
      this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
     this.props.clicked(this.props.value);
    }
    render() {
      return (
        <CIcon 
            name="cil-file"
            onClick={this.btnClickedHandler}
            style={{
                // background:'white',
                color:'black' 
            }}
        />
      )
    }
  }
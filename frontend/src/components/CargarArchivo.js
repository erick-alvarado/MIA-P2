import React, { Component } from 'react';
import { NavItem } from 'reactstrap';

class CargarArchivo extends Component {

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      alert(text)
    };
    reader.readAsText(e.target.files[0])
  }

  render = () => {

    return (
        <NavItem> 
            <input type="file" onChange={(e) => this.showFile(e)} />
        </NavItem>
    )
  }
}

export default CargarArchivo;
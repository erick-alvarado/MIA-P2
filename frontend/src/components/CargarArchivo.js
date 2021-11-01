import React, { Component } from 'react';
import { Input } from 'reactstrap';
import convert from 'xml-js';
import axios from 'axios';
const urlServer = `http://localhost:3001`;
class CargarArchivo extends Component {

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      let json_ = convert.xml2js(text,{compact: true})
      alert(json_)
      console.log(json_)
      await axios.post(urlServer+`/database/cargaMasiva`, json_ )
        .then(response=>{
            alert(JSON.stringify(response.data));
        })
        .catch(error=>{
            alert(error);
        })


    };
    reader.readAsText(e.target.files[0])
  }

  render = () => {
    return (
      <Input type="file" onChange={(e) => this.showFile(e)} />
    )
  }
}

export default CargarArchivo;
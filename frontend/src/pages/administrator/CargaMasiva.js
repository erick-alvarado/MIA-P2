import React, { Component } from 'react';
import CargarArchivo from '../../components/CargarArchivo';
import {Label,Form} from 'reactstrap'
class CargaMasiva extends Component {
  render = () => {

    return (
        <Form>
            <Label for="exampleEmail" size="sm" sm={2} >Seleccione un archivo </Label>
            <CargarArchivo/>

        </Form>
    )
  }
}
export default CargaMasiva;
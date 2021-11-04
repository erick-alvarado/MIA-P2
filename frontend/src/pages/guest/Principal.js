import React, { Component } from 'react';
import axios from 'axios';
import {Button,Table} from 'reactstrap'
import { Rating } from 'react-simple-star-rating'
import Car from '../../components/Carousel';
//const urlServer = `http://localhost:3001`;

const urlServer = `http://localhost:3001`;

class Principal extends Component {

  constructor(props) {
    super(props);
      this.state = {
        puestos: [],
        rate:0
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange = async e => {
    await this.setState({
        form: {
            ...this.state.form,
            [e.target.name]: e.target.value
        }
    });
    console.log(this.state.form);
  }
  setEstrella = async (data) =>{
    this.state.rate= data
  }
  calificarPuesto = async (id)=>{
    console.log(id+":"+this.state.rate)
    await axios.post(urlServer + `/puesto/estrellas`,
        {
          id_puesto: id,
          estrellas: this.state.rate
        })
        .then(response => {
            this.load();
            alert(JSON.stringify(response.data))
        })
        .catch(error => {
            alert(error);
        })
  }
  componentDidMount = async () => {
    this.load();
  }
  load = async () => {
    await axios.get(urlServer + `/puesto`)
        .then(response => {
            this.setState({ puestos: response.data });
        })
        .catch(error => {
            alert(error);
        })
  }
  render = () => {
    return (
      <div style={{ width: "800px"}}>
        <Car/>
        <Table hover responsive>
          <thead>

          <tr>
            <th>#</th>
            <th>Puesto</th>
            <th>Salario</th>
            <th>Calificar</th>
            <th>Control</th>
          </tr>
          </thead>
          <tbody>
            {this.state.puestos.map(v => {
                return (
                  <tr key = {v.id_puesto}>
                    <th scope="row">
                      {v.id_puesto}
                    </th>
                    <td>
                      {v.nombre}
                    </td>
                    <td>
                      {v.salario}
                    </td>
                    <td>
                        <Rating key = {"R"+v.id_puesto} onClick={(e)=>{this.setEstrella(e); this.calificarPuesto(v.id_puesto);}} ratingValue={0} /* Rating Props */ />
                    </td>
                    <td>
                    <Button name = 'rate'outline color='danger' onClick={() => this.eliminarUsuario(v)}>Control</Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>

    )
  }
}

export default Principal;
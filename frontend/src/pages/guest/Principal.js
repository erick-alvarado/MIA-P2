import React, { Component } from 'react';
import axios from 'axios';
import { Button, Table, Input, InputGroup, Modal, ModalBody,ModalHeader,ModalFooter } from 'reactstrap'
import { Rating } from 'react-simple-star-rating'
import Car from '../../components/Carousel';
import Registro from '../../components/Registro'
const urlServer = process.env.REACT_APP_IP_BACKEND;

class Principal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      puestos: [],
      rate: 0,
      search: '',
      modal: false
    }
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });
  }
  
  setEstrella = async (data) => {
    this.state.rate = data
  }
  calificarPuesto = async (id) => {
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
    await axios.get(urlServer + `/puesto/${this.state.search}`)
      .then(response => {
        this.setState({ puestos: response.data });
      })
      .catch(error => {
        alert(error);
      })
  }
  render = () => {
    const toggle = (id) => this.setState({ modal: !this.state.modal });
    return (
      <div style={{ width: "800px" }}>
        <Car />
        <InputGroup>
          <Input name="search" onChange={this.handleChange} />
          <Button onClick={() => this.load()} >  Search </Button>
        </InputGroup>
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
                <tr key={v.id_puesto}>
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
                    <Rating key={"R" + v.id_puesto} onClick={(e) => { this.setEstrella(e); this.calificarPuesto(v.id_puesto); }} ratingValue={0} /* Rating Props */ />
                  </td>
                  <td>
                    <Button color="info" onClick={toggle} > Click Me </Button>

                    <Modal isOpen={this.state.modal} toggle={toggle} >
                      <ModalHeader toggle={toggle}> Formulario</ModalHeader>
                      <ModalBody> 

                        <Registro idpuesto = {v.id_puesto} name = "CV"/>

                      </ModalBody>
                      <ModalFooter>
                        
                        {' '}
                        <Button onClick={toggle}> Cancel </Button>
                      </ModalFooter>
                    </Modal>
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
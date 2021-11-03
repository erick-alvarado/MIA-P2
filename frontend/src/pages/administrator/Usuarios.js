import React, { Component } from 'react';
import { Form, FormGroup, Input,Label,Col,Button } from 'reactstrap';
import axios from 'axios';
//const urlServer = `http://localhost:3001`;

const urlServer = `http://localhost:3001`;

class Usuarios extends Component {

  constructor(props) {
    super(props);
      this.state = {
        users: {},
        deps: [],
        form: {
          usuario: '',
          contrasena: '',
          departamento: '',
          rol: ''
        }
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
  componentDidMount = async () => {
    this.load();
  }
  load = async () => {
    await axios.get(urlServer + `/departamento`)
        .then(response => {
            this.setState({ deps: response.data });
        })
        .catch(error => {
            alert(error);
        })
  }
  crearUsuario = async () => {
    console.log('creando Usuario')
    await axios.post(urlServer + `/usuario`,
        {
          usuario: this.state.form.usuario,
          contrasena: this.state.form.contrasena,
          departamento: this.state.form.departamento,
          rol: this.state.form.rol
        })
        .then(response => {
            alert(JSON.stringify(response.data))
        })
        .catch(error => {
            alert(error);
        })
  }
  render = () => {
    return (
      <Form>
        <FormGroup row>
          <Label sm={1}>Usuario</Label>
          <Col sm={5}>
            <Input name='usuario' value={this.state.form.usuario} onChange={this.handleChange} style={{ width: "400px" }}  />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Contrasena</Label>
          <Col sm={5}>
            <Input name='contrasena' value={this.state.form.contrasena} onChange={this.handleChange} style={{ width: "400px" }}  />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Departamento</Label>
          <Col sm={5}>
            <Input name='departamento' type="select" onChange={this.handleChange}>
              {this.state.deps.map(v => {
                return (
                  <option key={v.id_departamento}>
                    {v.nombre}
                  </option>
                )
              })}

            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}>Rol</Label>
          <Col sm={5}>
            <Input name='rol' type="select" onChange={this.handleChange}>
              <option key='1'>
                coordinador
              </option>
              <option key='2'>
                reclutador
              </option>

            </Input>
          </Col>
        </FormGroup>
        <Button variant="primary" onClick={() => this.crearUsuario()}>Crear</Button>
      </Form>
    )
  }
}

export default Usuarios;
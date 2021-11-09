import React, { Component } from 'react';
import { Form, FormGroup, Input,Label,Col,Button,Table } from 'reactstrap';
import axios from 'axios';


const urlServer = process.env.REACT_APP_IP_BACKEND;


class Usuario extends Component {

  constructor(props) {
    super(props);
      this.state = {
        users: [],
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
    this.obtenerUsuarios();
    
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
            this.load();
            alert(JSON.stringify(response.data))
        })
        .catch(error => {
            alert(error);
        })
  }
  eliminarUsuario = async (usuario) =>{
    await axios.post(urlServer + `/usuario/delete`,{
      id_usuario: usuario.id
    })
    .then(response => {
      this.load();
      alert(JSON.stringify(response.data))
    })
    .catch(error => {
        alert(error);
    })
  }
  modificarUsuario = async (usuario) =>{
    await axios.post(urlServer + `/usuario/update`,{
      id_usuario: usuario.id,
      usuario: this.state.form.usuario,
      contrasena: this.state.form.contrasena,
      departamento: this.state.form.departamento,
      rol: this.state.form.rol
    })
    .then(response => {
      this.load()
      alert(JSON.stringify(response.data))
    })
    .catch(error => {
        alert(error);
    })
  }
  obtenerUsuarios = async() =>{
    await axios.get(urlServer + `/usuario`)
    .then(response => {
        this.setState({ users: response.data });
    })
    .catch(error => {
        alert(error);
    })
  }
  render = () => {
    return (
      <div>
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
        <Table hover responsive>
          <thead>

          <tr>
            <th>#</th>
            <th>Departamento</th>
            <th>Usuario</th>
            <th>Contrasena</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Rol</th>
            <th>Control</th>
          </tr>
          </thead>
          <tbody>
            {this.state.users.map(v => {
                return (
                  <tr key = {v.id}>
                    <th scope="row">
                      {v.id}
                    </th>
                    <td>
                      {v.departamento}
                    </td>
                    <td>
                      {v.usuario}
                    </td>
                    <td>
                      {v.contrasena}
                    </td>
                    <td>
                      {v.fecha_inicio}
                    </td>
                    <td>
                      {v.fecha_fin}
                    </td>
                    <td>
                      {v.rol}
                    </td>
                    <td>
                      <Button outline color='warning' onClick={() => this.modificarUsuario(v)}>Modificar</Button>
                      <Button outline color='danger' onClick={() => this.eliminarUsuario(v)}>Eliminar</Button>
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

export default Usuario;
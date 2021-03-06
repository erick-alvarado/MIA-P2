import React, { Component } from 'react';
import { Button,Table } from 'reactstrap';
import axios from 'axios';

const urlServer = process.env.REACT_APP_IP_BACKEND;


class Planilla extends Component {

  constructor(props) {
    super(props);
      this.state = {
        user: this.props.user,
        users: []
      }
  }

  componentDidMount = async () => {
    this.load();
  }
  load = async () => {
    await axios.get(urlServer + `/usuario/${this.state.user}/users`)
    .then(response => {
        this.setState({ users: response.data });
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
    await axios.post(urlServer + `/usuario/asociar`,{
      id_usuario: usuario.id,
      usuario: usuario.usuario
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
                      <Button outline color='success' onClick={() => this.modificarUsuario(v)}>Asociar</Button>
                      <Button outline color='danger' onClick={() => this.eliminarUsuario(v)}>Descartar</Button>
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

export default Planilla;
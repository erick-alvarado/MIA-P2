import React, { Component } from 'react';
import {Table , Button } from 'reactstrap';
import axios from 'axios';

const urlServer = process.env.REACT_APP_IP_BACKEND;


class UsuarioD extends Component {

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
    await axios.get(urlServer + `/usuario/${this.state.user}/personal`)
    .then(response => {
        this.setState({ users: response.data });
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

export default UsuarioD;
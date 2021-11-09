import React, { Component } from 'react';
import { Button,Table, Modal, ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import axios from 'axios';

const urlServer = process.env.REACT_APP_IP_BACKEND;


class Expediente extends Component {

  constructor(props) {
    super(props);
      this.state = {
        exps: [],
        user: this.props.user,
        url:''
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount = async () => {
    this.load();
  }
  load = async () => {
    await axios.get(urlServer + `/expediente/${this.state.user}`)
        .then(response => {
            this.setState({ exps: response.data });
        })
        .catch(error => {
            alert(error);
        })
  }
  show = (url)=>{
    this.setState({ modal: !this.state.modal,url : url })
  }
  render = () => {
    const toggle = () => this.setState({ modal: !this.state.modal });
    return (
      <div>
        <Table hover responsive>
          <thead>

          <tr>
            <th>#</th>
            <th>DPI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>CV</th>
          </tr>
          </thead>
          <tbody>
            {this.state.exps.map(v => {
                return (
                  <tr key = {v.id}>
                    <th scope="row">
                      {v.id}
                    </th>
                    <td>
                      {v.dpi}
                    </td>
                    <td>
                      {v.nombres}
                    </td>
                    <td>
                      {v.apellidos}
                    </td>
                    <td>
                      {v.correo}
                    </td>
                    <td>
                      {v.direccion}
                    </td>
                    <td>
                      {v.telefono}
                    </td>
                    <td>
                      <Button outline color='info' onClick={() => this.show(v.url)}>Ver</Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={toggle} >
              <ModalHeader toggle={toggle}> CV</ModalHeader>
              <ModalBody>
                    <embed src={this.state.url} width="100%" height="100%" />
              </ModalBody>
              <ModalFooter>

                {' '}
                <Button onClick={toggle}> Cancel </Button>
              </ModalFooter>
            </Modal>
      </div>

    )
  }
}

export default Expediente;
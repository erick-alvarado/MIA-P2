import React, { Component } from 'react';
import axios from 'axios';
import Car from '../../components/Carousel';
//const urlServer = `http://localhost:3001`;

const urlServer = `http://localhost:3001`;

class Principal extends Component {

  constructor(props) {
    super(props);
      this.state = {
        puestos: []
      }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange = async e => 
  {    
    await this.setState({value: e.target.value});  
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
      </div>

    )
  }
}

export default Principal;
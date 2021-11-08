import React, { Component } from 'react';
import { Input, Col, FormGroup, Label , Form,Button} from 'reactstrap';
import CargarArchivo from './CargarArchivo';
import axios from 'axios';
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                dpi: 0,
                nombres:'',
                apellidos:'',
                correo: '',
                telefono: 0, 
                direccion : '',
            }
        }
        this.handleChangeForm = this.handleChangeForm.bind(this)
    }

    handleChangeForm = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }
    saveForm = async () => {
        var url=""
        const data = new FormData() 
        data.append('file', this.state.file)
        await axios.post(process.env.REACT_APP_IP_BACKEND+"/upload", data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            url = res.data
        })
        .catch(error => {
            alert(error);
        })
        if(url!==""){
            await axios.post(process.env.REACT_APP_IP_BACKEND + `/puesto/postularse`,{
                id_puesto: this.props.idpuesto,
                dpi: this.state.form.dpi,
                nombres: this.state.form.nombres,
                apellidos: this.state.form.apellidos,
                correo: this.state.form.correo,
                telefono: this.state.form.telefono,
                direccion: this.state.form.direccion,
                url : url
            })
            .then(response => {
                alert(JSON.stringify(response.data))
            })
            .catch(error => {
                alert(error);
            })
        }

    }
    handleCallBack = (data) =>{
        this.setState({file: data})
    }

    render = () => {
        return (
            <Form>
                <FormGroup row>
                    <Label sm={3}>DPI</Label>
                    <Col sm={8}>
                        <Input type='number' name='dpi' value={this.state.form.dpi} onChange={this.handleChangeForm} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Nombres</Label>
                    <Col sm={8}>
                        <Input type='text' name='nombres' value={this.state.form.nombres} onChange={this.handleChangeForm} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Apellidos</Label>
                    <Col sm={8}>
                        <Input type='text' name='apellidos' value={this.state.form.apellidos} onChange={this.handleChangeForm} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Correo</Label>
                    <Col sm={8}>
                        <Input type='email' name='correo' value={this.state.form.correo} onChange={this.handleChangeForm} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Dirrecion</Label>
                    <Col sm={8}>
                        <Input type='text' name='direccion' value={this.state.form.direccion} onChange={this.handleChangeForm} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>Telefono</Label>
                    <Col sm={8}>
                        <Input type='number' name='telefono' value={this.state.form.telefono} onChange={this.handleChangeForm} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>CV</Label>
                    <Col sm={8}>
                        <CargarArchivo data = {this.props.idpuesto} parentCallback = {this.handleCallBack}/>
                    </Col>
                </FormGroup>
                <Button color="primary" onClick={this.saveForm} > Do Something </Button>
            </Form>

        )
    }
}
export default Registro;
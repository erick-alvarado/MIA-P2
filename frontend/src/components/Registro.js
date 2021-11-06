import React, { Component } from 'react';
import { Input, Col, FormGroup, Label , Form} from 'reactstrap';
import CargarArchivo from './CargarArchivo';

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
                direccion : ''
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
        console.log(this.state.form);
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
                        <Input type='text' name='correo' value={this.state.form.direccion} onChange={this.handleChangeForm} />
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
                        <CargarArchivo data = {this.state.form.dpi}/>
                    </Col>
                </FormGroup>
            </Form>

        )
    }
}
export default Registro;
import React from 'react';
import { Input } from 'reactstrap';

class CargarArchivo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file:null
        }
    }
    onChangeHandler=e=>{
        this.setState({file: e.target.files[0],loaded:0, data:this.props.data})
    }
    render = () => {
        return (
            <Input type="file" onChange={(e) => this.onChangeHandler(e)} />
        )
      }
}
export default CargarArchivo;


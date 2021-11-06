import React, { Component } from 'react';
import { Input,Button,FormGroup,Label } from 'reactstrap';
import axios from 'axios';
const urlServer = process.env.REACT_APP_IP_BACKEND;

const parser = require('fast-xml-parser');
const he = require('he');

const options = {
  attributeNamePrefix : "@_",
  attrNodeName: "attr", //default is 'false'
  textNodeName : "#text",
  ignoreAttributes : true,
  ignoreNameSpace : false,
  allowBooleanAttributes : false,
  parseNodeValue : true,
  parseAttributeValue : false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  numParseOptions:{
    hex: true,
    leadingZeros: true,
    //skipLike: /\+[0-9]{10}/
  },
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
  tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"],
  alwaysCreateTextNode: false
};

class CargaMasiva extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: {},
      xml: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange = async e => 
  {    
    await this.setState({value: e.target.value});  
  }
  showFile = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      let jsonObj = parser.parse(text,options, true);
      this.setState({data:jsonObj,xml:text})
    };
    reader.readAsText(e.target.files[0])
  }

  readFile= async ()=>{
    alert(JSON.stringify(this.state.data))
    await axios.post(urlServer+`/database/cargaMasiva`, this.state.data )
    .then(response=>{
        alert(JSON.stringify(response.data));
    })
    .catch(error=>{
        alert(error);
    })
  }
  render = () => {
    return (
      <FormGroup>
        <Label for="exampleEmail" size="sm" sm={2} >Seleccione un archivo </Label>
        <Input type="file" onChange={(e) => this.showFile(e)} />
        <Label for="exampleText">
          Archivo cargado
        </Label>
        <Input
          id="exampleText"
          name="text"
          type="textarea"
          value = {this.state.xml}
          onChange = {this.handleChange}
          style = {{height:"500px"}}
        />
        <Button outline onClick={() => { this.readFile(); }}> Enviar </Button>

      </FormGroup>

    )
  }
}

export default CargaMasiva;
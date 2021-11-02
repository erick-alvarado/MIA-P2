import React, { Component } from 'react';
import { Input } from 'reactstrap';
import axios from 'axios';
const urlServer = `http://localhost:3001`;

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




class CargarArchivo extends Component {

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      let jsonObj = parser.parse(text,options, true);
      console.log(JSON.stringify(jsonObj))
      alert(JSON.stringify(jsonObj))
      console.log(jsonObj)
      await axios.post(urlServer+`/database/cargaMasiva`, jsonObj )
        .then(response=>{
            alert(JSON.stringify(response.data));
        })
        .catch(error=>{
            alert(error);
        })


    };
    reader.readAsText(e.target.files[0])
  }

  render = () => {
    return (
      <Input type="file" onChange={(e) => this.showFile(e)} />
    )
  }
}

export default CargarArchivo;
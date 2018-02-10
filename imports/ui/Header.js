import React, { Component } from 'react';

export default class Header extends Component { 
  constructor(){
    super();
    this.state = {open: false, table: "TF-0002", i: 0.15}
  }
  click() {
    if(!this.state.open){
      this.setState((state,props) => ({open: true}))
    }
  }
  componentDidUpdate(){
    if(this.state.open){
      this.refs.table.value = this.state.table
      this.refs.i.value = this.state.i
    }
  }
  okClick(e){
    e.stopPropagation()
    this.setState((state,props) => ({open: false, table: this.refs.table.value, i: this.refs.i.value})) 
  }
  render() {
    return (
      !this.state.open ?
        <div className="header" onClick={this.click.bind(this)} style={Stylesheet.header(this.state.open)}>{`${this.state.table} (i=${this.state.i}%)`}</div>
      :
        <div className="header" onClick={this.click.bind(this)} style={Stylesheet.header(this.state.open)}>
            <div style={{flex:1,display:"flex",alignItems: 'stretch'}}>
              <select ref="table" style={{flex:1, backgroundColor: '#333',margin:'3vw',border:0}} name="table">
                <option value="TF-0002">TF-0002</option>
                <option value="TH-0002">TH-0002</option>
              </select>
            </div>
            <div style={{flex:1,display:"flex",alignItems: 'stretch',margin:'3vw'}}>
              <div style={{lineHeight: '10vw',margin:'3vw',width:'20vw'}}>i: </div>
              <input ref="i" type="number" style={{backgroundColor: '#333',margin:'3vw',border:0,width:'20vw', textAlign: 'center'}} name="lname"/>
              <button style={{background: '#333',border: 0,margin: '3vw',padding: 0,lineHeight: '100%',textAlign: 'center',flex: 1}} onClick={this.okClick.bind(this)}>OK</button>
            </div>
        </div>
    );
  }
}

const Stylesheet = {
  header: open => ({
    lineHeight: (open?'6vw':'10vh'),
    fontSize:(open?'6vw':'5vh'),
    height:(open? '40vw':'10vh'),
  })
}
import React, { Component } from 'react'
import Grid from './Grid.js'
import Header from './Header.js'
import Cell from './Cell.js'
import Formulas from '../data/Formulas.js'

// App component - represents the whole app
export default class App extends Component { 
  constructor() {
    super();
    this.state = { open: false }
  }
  openTools(node) {
    this.setState((state,props)=>({open: true, node: node}))
  }
  closeTools() {
    this.state.node.close()
    this.setState((state,props)=>({open: false}))
  }
  render() {
    return (
      <div className="container">
        <Header/>
        <Grid by={3} tools={this.state.open} closeToolsCallback={this.closeTools.bind(this)}>
          {
            Formulas
              .map((x, i) => (
                <Cell key={i} formula={x.cellFormula} toolsCallback={this.openTools.bind(this)}/>
              ))
          }
        </Grid>
      </div>
    );
  }
}
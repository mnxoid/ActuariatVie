import React, { Component } from 'react';
import Grid from './Grid.js';
import Header from './Header.js'
import Cell from './Cell.js'

const seq = n => Array(n).fill(1).map((x, y) => x + y)

const data = ["l_x","d_x","D_x","N_x","S_x","C_x","M_x","R_x","_n\\ddot a_x","_nA_x","_nE_x","_{d|n}\\ddot a_x","_nD\\ddot a_x","_nI\\ddot a_x","_np_x","_nq_x","\\Pi","P"]

// App component - represents the whole app
export default class App extends Component { 
  render() {
    return (
      <div className="container">
        <Header/>
        <Grid by={3}>
          {
            data
              .map((x, i) => (
                <Cell key={i} formula={x} />
              ))
          }
        </Grid>
      </div>
    );
  }
}
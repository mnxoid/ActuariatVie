import React, { Component } from 'react';
import Grid from './Grid.js';
import {Tex} from 'react-tex';

const seq = n => Array(n).fill(1).map((x, y) => x + y)

const data = ["l_x","d_x","D_x","N_x","S_x","C_x","M_x","R_x","_n\\ddot a_x","_nA_x","_nE_x","_{d|n}\\ddot a_x","_nD\\ddot a_x","_nI\\ddot a_x","_np_x","_nq_x","\\Pi","P"]

//TODO: Line 18: replace by clickable component with effect https://tympanus.net/codrops/2015/02/11/subtle-click-feedback-effects/

// App component - represents the whole app
export default class App extends Component { 
  render() {
    return (
      <div style={Stylesheet.container}>
        <Grid margin='2vw' by={3}>
          {
            data
              .map((x, i) => (
                <div key={i} style={Stylesheet.cell}>
                  <Tex texContent={x}/>
                </div>
              ))
          }
        </Grid>
      </div>
    );
  }
}

const Stylesheet = {
  container: {
    display: 'flex',
    backgroundColor: '#333',
    alignItems: 'stretch',
    justifyContent: 'center',
    color: '#eee',
    minHeight: '100vh',
  },
  cell: {
    width: '28vw',
    height: '28vw',
    display: 'flex',
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: "10vw"
  }
}
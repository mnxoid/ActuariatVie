import React, { Component } from 'react';
import Grid from './Grid.js';
import Header from './Header.js'
import {Tex} from 'react-tex';

const seq = n => Array(n).fill(1).map((x, y) => x + y)

const data = ["l_x","d_x","D_x","N_x","S_x","C_x","M_x","R_x","_n\\ddot a_x","_nA_x","_nE_x","_{d|n}\\ddot a_x","_nD\\ddot a_x","_nI\\ddot a_x","_np_x","_nq_x","\\Pi","P"]

// App component - represents the whole app
export default class App extends Component { 
  render() {
    return (
      <div style={Stylesheet.container}>
        <Header/>
        <Grid margin='2vw' by={3} height='calc(100vh - 14vw + 1px)'>
          {
            data
              .map((x, i) => (
                <div className="cell" key={i}>
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
    backgroundColor: '#555',
    alignItems: 'stretch',
    justifyContent: 'center',
    color: '#eee',
    minHeight: '100vh',
    flexDirection: 'column'
  }
}
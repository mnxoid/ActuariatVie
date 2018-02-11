import React, { Component } from 'react';
import {Tex} from 'react-tex';

export default class Cell extends Component { 
  constructor(){
    super();
    this.state = {open: false, classes: "cell", style: {}}
  }
  click() {
    //let parent know we're open
    if(!this.state.open){
      this.setState((state,props) => ({
        open: true, 
        classes: "cell", 
        style: {
          top: this.refs.cell.getBoundingClientRect().top,
          left: this.refs.cell.getBoundingClientRect().left,
          position: 'absolute',
        },
        dirty: true,
        oldpos: this.refs.cell.getBoundingClientRect()
      }))
      this.props.toolsCallback(this)
    } else {
      this.close() //debug only : this should not be on click
    }
  }
  close(){
    // let parent know we're closed
    this.setState((state,props) => ({
      open: false, 
      classes: "cell", 
      style: {
        top: state.oldpos.top,
        left: state.oldpos.left,
        position: 'absolute',
      },
      dirty: true
    }))
  }
  componentDidUpdate(){
    if(this.state.dirty && this.state.open){
      this.setState((state,props) => ({
        open: true, 
        classes: "cell cell-active", 
        style: {
          top: this.refs.cell.getBoundingClientRect().top,
          left: this.refs.cell.getBoundingClientRect().left,
          position: 'absolute'
        },
        dirty: false,
        oldpos: state.oldpos
      }))
    }
    setTimeout(() =>{
      if(this.state.dirty && !this.state.open){
        this.setState((state,props) => ({
          open: false, 
          classes: "cell",
          style: {},
          dirty: false
        }))
      }
    },200)
    
  }
  render() {
    return (
      <div ref="cell" style={this.state.style} className={this.state.classes} onClick={this.click.bind(this)}>
        <Tex texContent={this.props.formula}/>
      </div>
    );
  }
}
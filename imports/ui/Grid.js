import React, { Component } from 'react';

Array.prototype.chunk = function ( n ) {
    if ( !this.length ) {
        return [];
    }
    return [ this.slice( 0, n ) ].concat( this.slice(n).chunk(n) );
}

const pad = n => (arr, empty) => {
  while(arr.length<n) arr.push(empty)
  return arr
}

// Grid component - creates a n-column grid
export default class Grid extends Component {
  render() {
    return(
      <div style={Stylesheet.wrapper(this.props.margin)}>
        {
          this.props.children
            .chunk(this.props.by)
            .map(x=>pad(this.props.by)(x,<div style={x[0].props.style}></div>))
            .map((childRow, i) => 
              <div style={Stylesheet.row} key={i}>
                {
                  childRow
                  .map((x,j)=>React.cloneElement(x, {
                    style: Object.assign(x.props.style, Stylesheet.elem(this.props.margin)),
                    key: j
                  }))
                }
              </div>
            )
        }
      </div>
    )
  }
}

const Stylesheet = {
  wrapper: margin => ({
    flex:1,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: margin,
  }),
  row: {
    flex:1,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  elem: margin => ({
    margin: margin
  })
}
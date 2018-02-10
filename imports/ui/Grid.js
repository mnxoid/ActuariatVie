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
      <div className="grid-wrapper">
        {
          this.props.children
            .chunk(this.props.by)
            .map(x=>pad(this.props.by)(x,<div style={x[0].props.style}></div>))
            .map((childRow, i) => 
              <div className="row" key={i}>
                {
                  childRow
                  .map((x,j)=>React.cloneElement(x, {
                    key: j
                  }))
                }
              </div>
            )
        }
        <div className="cell-tools cell-tools-inactive">x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/></div>
      </div>
    )
  }
}
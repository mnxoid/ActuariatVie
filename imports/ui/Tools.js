import React, { Component } from 'react';

// Tools component
export default class Tools extends Component {
  render() {
    return(
      <div className={this.props.tools ? "cell-tools" : "cell-tools cell-tools-inactive"} onClick={this.props.closeToolsCallback}>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/>x=... etc<br/></div>
    )
  }
}
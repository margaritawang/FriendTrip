import React from 'react';
import { subscribeToTimer } from './api.js';
import Component from 'react';
import { connect } from 'react-redux';



class Socket extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          timestamp: 'no timestamp yet'
        }
      subscribeToTimer((err, timestamp) => this.setState({
        timestamp
      }));
    };
    render() {
      return (
        <div>
          <p> is the : {this.state.timestamp}</p>
        </div>
      )
    }
}

const connectedSocket = connect()(Socket);
export { connectedSocket as Socket };

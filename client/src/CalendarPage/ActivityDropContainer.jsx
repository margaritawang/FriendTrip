import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const types = {
  ACTIVITY: 'ACTIVITY'
}

const dateTarget = {
  drop(props, monitor, component){
    const item = monitor.getItem();
    console.log("DROPPED ITEM?: ", item);
    return { name: 'Date' }
  },

  hover(props, monitor, component){
    console.log("HOVER: ", monitor.canDrop());
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

class ActivityDropContainer extends Component{

  render(){
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = isOver;
    let backgroundColor = '#FFF';
    if(isActive){
      backgroundColor = '#000';
    }else if (canDrop){
      backgroundColor = 'darkkhaki';
    }

    return (
    <div style={{ height: '100px', width: '100px', backgroundColor }} >
      {isActive ? 'Release here' : 'Drag an activity here'}
    </div>
    );
  }
}

const DropActivityDropContainer = DropTarget(types.ACTIVITY, dateTarget, collect)(ActivityDropContainer);
export { DropActivityDropContainer as ActivityDropContainer };
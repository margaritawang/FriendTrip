import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { DragCard } from './DragBadges.jsx';
import { ActivityBadgeNoComments } from './ActivityBadgeNoComments';

const types = {
  ACTIVITY: 'ACTIVITY'
}

const dateTarget = {
  drop(props, monitor, component){
    // props.onDrop(monitor.getItem());
    const date = props.date;
    const item = monitor.getItem();
    console.log("Item: ", item);
    console.log("Props: ", props);
    console.log("Component", component);
    props.onDrop(monitor.getItem(), props);
    return { name: date }
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
    const { canDrop, isOver, connectDropTarget, activities } = this.props;
    const date = this.props.date;
    const isActive = isOver;
    let backgroundColor = '#FFF';
    if(isActive){
      backgroundColor = '#222';
    }else if (canDrop){
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
    <div date={date} style={{ height: '100px', width: '100%', backgroundColor }} >
      {
        activities.map((activity) => {
          return (<DragCard text={<ActivityBadgeNoComments activity={activity.activity} />} />);
        })
      }
    </div>
    );
  }

}

const DropActivityDropContainer = DropTarget(types.ACTIVITY, dateTarget, collect)(ActivityDropContainer);
export { DropActivityDropContainer as ActivityDropContainer };
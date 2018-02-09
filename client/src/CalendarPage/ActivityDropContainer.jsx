import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {DragCard} from './DragBadges.jsx';
import {ActivityBadgeNoComments} from './ActivityBadgeNoComments';

const types = {
  ACTIVITY: 'ACTIVITY'
}

const dateTarget = {
  drop(props, monitor, component) {
    const date = props.date;
    const item = monitor.getItem();
    props.onDrop(monitor.getItem(), props);
    return {name: date}
  }
}

function collect(connect, monitor) {
  return {connectDropTarget: connect.dropTarget(), isOver: monitor.isOver(), canDrop: monitor.canDrop()}
}

class ActivityDropContainer extends Component {
  render() {
    const {canDrop, isOver, connectDropTarget, activities, isDropped} = this.props;
    const date = this.props.date;
    const isActive = isOver;
    let backgroundColor = '#FFF';
    if (isActive) {
      backgroundColor = '#222';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }
    return connectDropTarget(<div date={date} style={{
        minHeight: '70px',
        width: '100%',
        backgroundColor
      }}>
      {
        activities.map((activity, index) => {
          return (<DragCard key={index} text={<ActivityBadgeNoComments activity = {
              activity
            } />}/>);
        })
      }
    </div>);
  }
}

const DropActivityDropContainer = DropTarget(types.ACTIVITY, dateTarget, collect)(ActivityDropContainer);
export {
  DropActivityDropContainer as ActivityDropContainer
};

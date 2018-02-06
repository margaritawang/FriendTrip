// Let's make <Card text='Write the docs' /> draggable!
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
// import { ItemTypes } from './Constants';


const ItemTypes = {
  ACTIVITY: 'ACTIVITY',
}
/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    console.log("Begin Dragging: ", props);
    // props.text.props.activity
    return {
      activity: props.text.props.activity
    };
  },

  endDrag(props, monitor){
    const item = monitor.getItem()
    console.log("DRAG ITEM: ", item);
    const dropResult = monitor.getDropResult()
    console.log("Drop Result: ", dropResult);
    if (dropResult){
      console.log(`You dropped ${item.activity} into ${dropResult.name}`, item.activity)
    }
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  // text: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

class DragCard extends Component {
  render() {
    const { isDragging, connectDragSource, text, isDropped } = this.props;
    console.log("Is Dropped DragBadge: ", isDropped);
    return connectDragSource(
      <div style={{ width: '100%', opacity: isDragging ? 0.5 : 1 }}>
        {isDropped ? "" : text}
      </div>
    );
  }
}

DragCard.propTypes = propTypes;

// Export the wrapped component:
const DragSourceDragCard = DragSource(ItemTypes.ACTIVITY, cardSource, collect)(DragCard);
export { DragSourceDragCard as DragCard };
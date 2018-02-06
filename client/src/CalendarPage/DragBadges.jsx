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
      text: props.text
    };
  },

  endDrag(props, monitor){
    const item = monitor.getItem()
    console.log("DRAG ITEM: ", item);
    const dropResult = monitor.getDropResult()
    console.log("Drop Result: ", dropResult);
    if (dropResult){
      alert(`You dropped ${item.text} into ${dropResult.name}`)
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
  text: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

class DragCard extends Component {
  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div style={{ width: '50px', height: '50px', opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }
}

DragCard.propTypes = propTypes;

// Export the wrapped component:
const DragSourceDragCard = DragSource(ItemTypes.ACTIVITY, cardSource, collect)(DragCard);
export { DragSourceDragCard as DragCard };
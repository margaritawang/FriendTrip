import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Header, Image, Table} from 'semantic-ui-react';
import Moment from 'react-moment';
import {ActivityDropContainer} from './ActivityDropContainer';

class CalendarComp extends Component {
  render() {
    const datesArray = this.props.schedule;
    const handleDrop = this.props.handleDrop;
    const isDropped = this.props.isDropped;
    return (<Table basic='very' celled="celled" collapsing="collapsing" size='large'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Activities</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          datesArray.map((element, index, array) => {
            return (<Table.Row key={index}>
              <Table.Cell key={index}>
                <Header as='h4' key={index}>
                  <Header.Content key={index}>
                    <Moment format="MMM, DD" key={index}>{element.date}</Moment>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell style={{
                  width: '100%'
                }} fluid="fluid" key={(-1 * index) - 1}>
                <ActivityDropContainer key={index} date={element.date} onDrop={(item, element) => {
                    handleDrop(item, element)
                  }} activities={element.activities} isDropped={isDropped}/>
              </Table.Cell>
            </Table.Row>)
          })
        }
      </Table.Body>
    </Table>);
  }
}

function mapStateToProps(state) {
  const {user} = state.authentication;
  const {trips} = state.users;
  const {activities} = state.users;
  return {trips, activities}
}

const connectedCalendarComp = connect(mapStateToProps)(CalendarComp);
export {
  connectedCalendarComp as CalendarComp
};

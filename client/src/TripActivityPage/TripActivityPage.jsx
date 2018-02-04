import React from 'react';
import { ActivityBadge } from '../_components';
import { Grid } from 'semantic-ui-react';

function TripActivityPage(props){
  return (
        <Grid container columns={3} style={{ marginTop: '3em' }} stackable>
          {
            props.activities.map(activity => {
              return (
                <Grid.Column key={activity.id}>
                  <ActivityBadge key={activity.id} activity={activity}/>
                </Grid.Column>
              )
            })
          }
        </Grid>
    )
}

export { TripActivityPage };
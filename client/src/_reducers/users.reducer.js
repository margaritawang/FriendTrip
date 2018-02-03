import { userConstants } from '../_constants';

export function users(state = { trips: [], activities: [], comments: [] }, action) {
  //console.log("i m state",state);
  //console.log("i m ...state", ...state);
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };

    case userConstants.GETALL_TRIPS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.GETALL_TRIPS_SUCCESS:
      return {
        ...state,
        trips: action.trips,
        loading: false
      };
    case userConstants.GETALL_TRIPS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      }

    case userConstants.CREATE_NEW_TRIP_REQUEST:
      return{
        ...state,
        loading: true
      }
    case userConstants.CREATE_NEW_TRIP_SUCCESS:
      const { trips } = state;
      return{
        ...state,
        trips: [...trips, action.trip],
        loading: false,
        error: ''
      }

    case userConstants.CREATE_NEW_TRIP_FAILURE:
      return{
        ...state,
        loading: false,
        error: action.error
      }

    case userConstants.GETALL_TRIP_ACTIVITIES_REQUEST:
      return{
        ...state,
        loading: true,
        error: ''
      }

    case userConstants.GETALL_TRIP_ACTIVITIES_SUCCESS:
      return{
        ...state,
        activities: action.activities,
        loading: false,
        error: ''
      }

    case userConstants.GETALL_TRIP_ACTIVITIES_FAILURE:
      return{
        ...state,
        error: action.error
      }

    case userConstants.CREATE_NEW_ACTIVITY_REQUEST:
      return{
        ...state,
        loading: true
      }

    case userConstants.CREATE_NEW_ACTIVITY_SUCCESS:
      const { activities } = state;
      return {
        ...state,
        activities: [...activities, action.activities],
        loading: false,
        error: ''
      }

    case userConstants.CREATE_NEW_ACTIVITY_FAILURE:
      return{
        ...state,
        error: action.error
      }

    case userConstants.GETALL_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }

    case userConstants.GETALL_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.comments,
        error: ''
      }

    case userConstants.GETALL_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case userConstants.CREATE_NEW_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: ''
      }

    case userConstants.CREATE_NEW_COMMENT_SUCCESS:
      const { comments } = state;
      return {
        ...state,
        loading: false,
        comments: [...comments, action.comment],
        error: ''
      }

    case userConstants.CREATE_NEW_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    default:
      return state
  }
}

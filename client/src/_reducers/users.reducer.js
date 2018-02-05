import { userConstants } from '../_constants';
import { chatConstants } from '../_constants';

export function users(state = { trips: [], activities: [], recommendations: [], comments: []}, action) {
  const { activities } = state;
  const { recommendations } = state;
  const { comments } = state;
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
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            const { deleting, ...userCopy } = user;
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

    case userConstants.DELETE_TRIP_REQUEST:
      return {
        ...state,
        loading: true
      }

    case userConstants.DELETE_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        trips: state.trips.filter(trip => trip.id !== action.tripid)
      }

    case userConstants.DELETE_TRIP_FAILURE:
      return {
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
      const currentComments = state.comments;

      // const filterNewComments = ((stateComments, actionComments) => {
      //   if (stateComments.length === 0) {


      //     // console.log('statecomments:', currentComments);
      //     return actionComments;
      //   }else{
      //     let result = [];
      //     for(let i = 0; i < stateComments.length; i++){
      //       for(let j = 0; j < actionComments.length; j++){
      //         // console.log("I element: ", actionComments[i].id)
      //         // console.log("J element: ", stateComments[j].id)
      //         console.log("RESULT", result);
      //         if(stateComments[i].id !== actionComments[j].id){
      //           result.push(actionComments[i]);
      //         }
      //       }
      //     }
      //     return stateComments.concat(result);
      //   }

          // return actionComments.filter((comment) => {
          //   for(let element of stateComments){
          //     console.log('element--------', element);
          //     if(element !== comment){
          //       return true;
          //     }
          //   }
          // })
      // })

      // console.log(filterNewComments(currentComments, action.comments));

      // const filteredNewComments = action.comments.filter((comment) => {
      //   if(state.comments.length > 0){
      //     for(let element of currentComments){
      //       if(element.id !== comment.id){
      //         return comment;
      //       }
      //     }
      //   }else{
      //     return comment;
      //   }
      // })
      // console.log("Filtered New Comments: ", filteredNewComments);
      return {
        ...state,
        loading: false,
        comments: currentComments.concat(action.comments),
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

    case userConstants.CLEAR_ALL_COMMENTS:
      return {
        ...state,
        comments: action.comments
      }

      case chatConstants.INCOMING_ACTIVITY:
        console.log("reducued", action.activity);
        return {
          ...state,
          activities: [...activities, action.activity.description],
          loading: false,
          error: ''
        }

      case userConstants.GET_RECOMMENDATION_REQUEST:
        return {
          ...state,
          loading: true
        }

      case userConstants.GET_RECOMMENDATION_SUCCESS:
        return {
          ...state,
          recommendations: action.recommendations,
          loading: false,
          error: ''
        }

      case userConstants.GET_RECOMMENDATION_FAILURE:
        return {
          ...state,
          error: action.error
        }

      case chatConstants.INCOMING_COMMENT:

        console.log("state comments", comments);
        console.log("reducued", action.comment);
        return {
          ...state,
          comments: [...comments, action.comment],
          loading: false,
          error: ''
        }

    default:
      return state
  }
}

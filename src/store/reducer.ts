import * as actionTypes from "./actionTypes"

const initialState: TimeTracksState = {
    tracks: [
        {
            id: 1,
            title: "track 1",
            start: 0,
            end: 0,
        },
        {
            id: 2,
            title: "track 2",
            start: 0,
            end: 0,
        }
    ]
}

const reducer = (
    state: TimeTracksState = initialState,
    action: TimeAction
  ): TimeTracksState => {
    switch (action.type) {
      case actionTypes.ADD_TIMETRACK:
        const newTimeObj: ITimeObj = {
          id: state.tracks[state.tracks.length - 1].id + 1, 
          title: action.track.title,
          start: action.track.start,
          end: action.track.end,
        }
        return {
          ...state,
          tracks: state.tracks.concat(newTimeObj),
        }
      case actionTypes.REMOVE_TIMETRACK:
        const updatedArticles: ITimeObj[] = state.tracks.filter(
          track => track.id !== action.track.id
        )
        return {
          ...state,
          tracks: updatedArticles,
        }
    }
    return state
  }
  
  export default reducer
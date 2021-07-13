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
    ],
    current: {
      id: 0,
      title: "",
      start: 0,
      end: 0,
    }
}

const reducer = (
    state: TimeTracksState = initialState,
    action: TimeAction
  ): TimeTracksState => {
    switch (action.type) {
      case actionTypes.ADD_TIMETRACK:
        let t: any = state.tracks[state.tracks.length - 1]
        const newTimeObj: ITimeObj = {
          id: t && t.id? t.id + 1: 1, 
          title: action.track.title,
          start: action.track.start,
          end: action.track.end,
        }
        return {
          ...state,
          tracks: state.tracks.concat(newTimeObj),
        }
      case actionTypes.REMOVE_TIMETRACK:
        const updatedTracks: ITimeObj[] = state.tracks.filter(
          track => track.id !== action.track.id
        )
        return {
          ...state,
          tracks: updatedTracks,
        }
      case actionTypes.SAVE_TIMETRACK:
        return {
          ...state,
          current: action.track,
        }
    }
    return state
  }
  
  export default reducer
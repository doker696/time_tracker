import * as actionTypes from './actionTypes'

export function addTimeTrack(track: ITimeObj) {
    const action: TimeAction = {
        type: actionTypes.ADD_TIMETRACK,
        track,
    }
    return (dispatch: DispatchType) => {
        setTimeout(() => {
          dispatch(action)
        }, 100)
    }
}
export function removeTimeTrack(track: ITimeObj) {
    const action: TimeAction = {
        type: actionTypes.REMOVE_TIMETRACK,
        track,
    }
    return (dispatch: DispatchType) => {
        setTimeout(() => {
          dispatch(action)
        }, 100)
    }
}
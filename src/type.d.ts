interface ITimeObj {
    id: number
    start: number
    end: number
    title: String
}
type TimeTracksState = {
    tracks: ITimeObj[]
}
type TimeAction ={
    type: string
    track: ITimeObj
}

type DispatchType = (args: TimeAction) => TimeAction
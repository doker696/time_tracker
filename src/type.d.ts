interface ITimeObj {
    id?: number
    start: number
    end?: number
    title: String
    isRepeat?: Boolean
}

type TimeTracksState = {
    tracks: ITimeObj[]
    current: ITimeObj
}
type TimeAction ={
    type: string
    track: ITimeObj
}

type DispatchType = (args: TimeAction) => TimeAction
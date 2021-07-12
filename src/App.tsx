import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import { addTimeTrack, removeTimeTrack } from "./store/actionCreators";
import { TimeTrackHistory } from "./components/TimeTrackHistory";
import { TimeTracker } from "./components/TimeTracker";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '4px 8px',
      margin: "150px auto",
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

function App() {
  const classes = useStyles();
  const timeTracks: readonly ITimeObj[] = useSelector(
    (state: TimeTracksState) => state.tracks
  );

  const dispatch: Dispatch<any> = useDispatch();

  const saveTimeTrack = React.useCallback(
    (timeTrack: ITimeObj) => dispatch(addTimeTrack(timeTrack)),
    [dispatch]
  );
  const deleteTimeTrack = React.useCallback(
    (timeTrack: ITimeObj) => dispatch(removeTimeTrack(timeTrack)),
    [dispatch]
  );

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <TimeTracker
          _save={saveTimeTrack}  
        ></TimeTracker>
        <TimeTrackHistory
          _timeTracks={timeTracks}
          _delete={deleteTimeTrack}
        ></TimeTrackHistory>
      </Container>
    </div>
  );
}

export default App;

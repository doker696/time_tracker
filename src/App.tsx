import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import { addTimeTrack, removeTimeTrack, saveTimeTrack } from "./store/actionCreators";
import { TimeTrackHistory } from "./components/TimeTrackHistory";
import { TimeTracker } from "./components/TimeTracker";
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "4px 8px",
      margin: "150px auto",
      display: "flex",
      alignItems: "center",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    tracker: {
      margin: "5px auto",
    },
    history: {
      marginTop: "15px",
    },
  })
);

function App() {
  const classes = useStyles();
  const timeTracks: readonly ITimeObj[] = useSelector(
    (state: TimeTracksState) => state.tracks
  );
  const currentTimeTrack: ITimeObj = useSelector(
    (state: TimeTracksState) => state.current
  );

  const dispatch: Dispatch<any> = useDispatch();

  const _addTimeTrack = React.useCallback(
    (timeTrack: ITimeObj) => dispatch(addTimeTrack(timeTrack)),
    [dispatch]
  );
  const saveCurrentTimeTrack = React.useCallback(
    (timeTrack: ITimeObj) => dispatch(saveTimeTrack(timeTrack)),
    [dispatch]
  );
  const deleteTimeTrack = React.useCallback(
    (timeTrack: ITimeObj) => dispatch(removeTimeTrack(timeTrack)),
    [dispatch]
  );

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <div className={classes.tracker}>
          <TimeTracker _save={_addTimeTrack} _current={currentTimeTrack} _currentSave={saveCurrentTimeTrack} />
        </div>
        <div className={classes.history}>
          <TimeTrackHistory
            _timeTracks={timeTracks}
            _delete={deleteTimeTrack}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;

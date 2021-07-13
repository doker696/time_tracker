import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import { ControlButton, Timer } from "./Timer";

interface Props {
  _save: Function;
  _current: ITimeObj;
  _currentSave: Function;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "8px 16px",
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
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export const TimeTracker: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const [timeObj, setTimeObj] = useState<ITimeObj>(props._current);
  const [isActive, setIsActive] = useState(!!props._current.start);
  const [time, setTime] = useState(timeObj.start !== 0? Date.now() - timeObj.start : 0);
  const [timer, setTimer] = useState<any>(0)

  React.useEffect(() => {
    
    console.log("isActive: ",isActive);
    
    if (isActive) {
      setTimer(setInterval(() => {
        setTime((time) => time + 10);
      }, 10))
    } else {
      clearInterval(timer);
    }
    // return () => {
    //   clearInterval(interval);
    // };
  }, [isActive]);

  React.useEffect(() => {
    if (timeObj.end !== 0) {
      props._save(timeObj);

      setTimeObj({ title: "", id: 0, start: 0, end: 0 });
    } else {
      props._currentSave(timeObj);
    }
  }, [timeObj, props]);

  const handleStart = () => {
    setTimeObj({ ...timeObj, start: Date.now() });
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setTimeObj({ ...timeObj, end: Date.now() });
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Add comment"
        inputProps={{ "aria-label": "search google maps" }}
        value={timeObj.title}
        onChange={(val) => setTimeObj({ ...timeObj, title: val.target.value })}
      />
      <div style={{ margin: "0 8px" }}>
        <Timer time={time} />
      </div>
      <div>
        <ControlButton
          active={isActive}
          handleStart={handleStart}
          handleStop={handleReset}
        />
      </div>
    </Paper>
  );
};

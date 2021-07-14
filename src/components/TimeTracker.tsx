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
  const [time, setTime] = useState(
    timeObj.start !== 0 ? Date.now() - timeObj.start : 0
  );
  const [timer, setTimer] = useState<any>(0);

  React.useEffect(() => {
    if (props._current.start && props._current.isRepeat) {
      if (isActive) {
        props._save({ ...timeObj, end: Date.now() });
        clearInterval(timer);
        setTimer(
          setInterval(() => {
            setTime(() => Date.now() - props._current.start);
          }, 10)
        );
      } else {
        setIsActive(true);
      }
      setTimeObj(props._current);
    }
  }, [props._current]);

  React.useEffect(() => {
    if (isActive) {
      setTimer(
        setInterval(() => {
          setTime(() => Date.now() - timeObj.start);
        }, 10)
      );
      props._currentSave(timeObj);
    } else {
      clearInterval(timer);

      if (timeObj.end) {
        props._save(timeObj);
        setTimeObj({ title: "", id: 0, start: 0, end: 0 });
        props._currentSave({ title: "", id: 0, start: 0, end: 0 });
      }
    }
  }, [isActive]);

  const handleStart = () => {
    console.log("start");

    setTimeObj({ ...timeObj, start: Date.now(), isRepeat: false });
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

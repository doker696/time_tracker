import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import { ControlButton, Timer } from "./Timer";

interface Props {
  _save: Function;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
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

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [timeObj, setTimeObj] = useState<ITimeObj>({
    title: "",
    id: 0,
    start: 0,
    end: 0,
  });

  React.useEffect(() => {
    let interval: any = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  React.useEffect(() => {
    if (timeObj.end !== 0) {
      props._save(timeObj);
      console.log(timeObj);

      setTimeObj({ title: "", id: 0, start: 0, end: 0 });
      
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
      <Timer time={time} />
      <ControlButton
        active={isActive}
        handleStart={handleStart}
        handleStop={handleReset}
      />
    </Paper>
  );
};

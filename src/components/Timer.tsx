import { createStyles, IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import { PlayArrow, Stop } from "@material-ui/icons";

import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        margin: "auto"
    }
  })
);

export function Timer(props: { time: number }) {
  const classes = useStyles();

  return (
    <Typography variant="subtitle1" className={classes.root}>
      <span className="digits">
        {("0" + Math.floor((props.time / 60000000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
      </span>
    </Typography>
  );
}
export function ControlButton(props: {
  handleStart: Function;
  handleStop: Function;
  active: Boolean;
}) {
  const StartButton = (
    <IconButton onClick={() => props.handleStart()}>
      <PlayArrow />
    </IconButton>
  );
  const StopButton = (
    <IconButton onClick={() => props.handleStop()}>
      <Stop />
    </IconButton>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? StopButton : StartButton}</div>
    </div>
  );
}

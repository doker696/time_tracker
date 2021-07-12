import { Typography, Box, Button } from "@material-ui/core";
import * as React from "react";

interface Props {
  _timeTracks: readonly ITimeObj[];
  //   _save: Function;
  _delete: Function;
}

export const TimeTrackHistory: React.FunctionComponent<Props> = (props) => {

  return (
    <div>
      {props._timeTracks.map((track: ITimeObj) => {
        const d: Date = new Date();
        d.setTime(track.start);
        let start: string = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        d.setTime(track.end);
        let end: string = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        return (
          <Box key={track.id}>
            <Typography variant="h5">
              {track.title + " start:" + start+" end:" + end }
            </Typography>
            <Button onClick={() => props._delete(track)}>Delete</Button>
          </Box>
        );
      })}
    </div>
  );
};

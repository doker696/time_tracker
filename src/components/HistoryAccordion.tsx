import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createStyles,
  makeStyles,
  Theme,
  Grid,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { HistoryAccordionItem } from "./HistoryAccordionItem";
import * as React from "react";

interface Props {
  _timeTracks: readonly ITimeObj[];
  //   _save: Function;
  _delete: Function;
  _play: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20,
    },
    details: {
      alignItems: "center",
    },
    column: {
      flexBasis: "33.33%",
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

export const HistoryAccordion: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  const filterByDate = () => {
    let trackByDate: {
      date: string;
      tracks: ITimeObj[];
      elapsedTime: number;
    }[] = [];

    let date: Date = new Date();
    props._timeTracks.forEach((track) => {
      date.setTime(track.start);
      let t = trackByDate.find(
        (t) => t.date === date.toLocaleString().split(",")[0]
      );
      if (!t) {
        trackByDate.push({
          date: date.toLocaleString().split(",")[0],
          tracks: [],
          elapsedTime: 0,
        });
      }
      let tmpTrack = trackByDate.find(
        (t) => t.date === date.toLocaleString().split(",")[0]
      );
      tmpTrack?.tracks.push(track);
      tmpTrack!.elapsedTime += track.end! - track.start;
    });
    
    console.log(trackByDate);
    
    return trackByDate.reverse();
  };

  const getToday = () => {
    let date: Date = new Date();
    return date.toLocaleString().split(",")[0];
  };
  const getYesterday = () => {
    let yesterday: Date = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toLocaleString().split(",")[0];
  };
  const getElapsedTime = (elapsed: number) => {
    let date: Date = new Date();

    date.setTime(elapsed);
    return (
      ("0" + (date.getUTCHours())).slice(-2) +
      ":" +
      ("0" + (date.getUTCMinutes())).slice(-2) +
      ":" +
      ("0" + (date.getUTCSeconds())).slice(-2)
    );
  };


  return (
    <div className={classes.root}>
      {filterByDate().map((el) => {
        return (
          <Accordion key={el.tracks[0].id}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">
                  {el.date === getToday()
                    ? "Today"
                    : el.date === getYesterday()
                    ? "Yesterday"
                    : el.date}
                </Typography>
                <Typography variant="subtitle2" style={{ margin: "" }}>
                  {getElapsedTime(el.elapsedTime)}
                </Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container direction="column-reverse">
                {el.tracks.map((t) => {
                  return (
                    <HistoryAccordionItem
                      key={t.id}
                      _delete={props._delete}
                      _play={props._play}
                      _trackInfo={t}
                    />
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

import {
  Typography,

  createStyles,
  makeStyles,
  Theme,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {  PlayArrow, MoreVert } from "@material-ui/icons";
import * as React from "react";

interface Props {
  _trackInfo: ITimeObj;
  _play: Function;
  _delete: Function;
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

export const HistoryAccordionItem: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStart = () => {
    let date: Date = new Date();
    date.setTime(props._trackInfo.start);
    return (
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2)
    );
  };
  const getEnd = () => {
    let date: Date = new Date();
    date.setTime(props._trackInfo.end!);
    return (
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2)
    );
  };
  const getElapsedTime = (end: number,start: number) => {
    let dateEnd: Date = new Date();
    dateEnd.setTime(end - start);

    return (
      (
        "0" +
        (dateEnd.getUTCHours() )
      ).slice(-2) +
      ":" +
      (
        "0" +
        (dateEnd.getUTCMinutes())
      ).slice(-2) +
       ":" +
      (
        "0" +
        (dateEnd.getUTCSeconds() )
      ).slice(-2)
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item sm spacing={2} container justifyContent="flex-start">
          <Grid item>
            <Typography variant="body1">{props._trackInfo.title}</Typography>
          </Grid>
          {/* <Grid item>
                  <Typography variant="body1">Label</Typography>
                </Grid> */}
        </Grid>

        <Grid item>
          <Typography variant="subtitle2">
            {getStart() + " - " + getEnd()}
          </Typography>

        </Grid>
        <Grid item>
        <Typography variant="subtitle2">
            {getElapsedTime(props._trackInfo.end!,props._trackInfo.start)}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => props._play(props._trackInfo)}>
            <PlayArrow />
          </IconButton>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Typography
                color="secondary"
                variant="subtitle1"
                onClick={() => {
                  handleClose();
                  props._delete(props._trackInfo);
                }}
              >
                Delete
              </Typography>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
};

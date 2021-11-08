import React from "react";
import { makeStyles } from '@mui/styles';
import { CircularProgress } from "@mui/material";


//로딩스피너 만들기

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    flexGrow: 1,
  },
  top: {
    color: "#ffc149",
    animationDuration: "680ms",
  },
  circle: {
    strokeLinecap: "round",
  },
}));

function FacebookCircularProgress(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <FacebookCircularProgress />
      </div>
      <h4>조금만 기다려주세요!</h4>
    </div>
  );
}
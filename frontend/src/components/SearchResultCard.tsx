import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box, Grid, Typography } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactHtmlParser from "react-html-parser";
import {
  deleteCookie,
  getCookie,
  isCookie,
  setCookie
} from "../utils/cookieUtils";

export interface SearchResultCardProperties {
  title: string;
  description: number;
  image: string;
  summary: string;
  link: string;
  gender: string;
  location: string;
  age: string;
  outcome:string;
  actions?: React.ReactNode[];
}

const useStyles = makeStyles(({ palette }) => ({
  card: {
    //height: "100%",
    flexDirection: "column",
    // boxShadow:
    //   "2px 4px 20px 0px rgb(0 0 0 / 50%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
  },
  actions: {
    justifyContent: "flex-end",
    marginTop: "auto"
  },
  primaryColor: {
    color: palette.primary.main
  },
  box: {
    display: "inline-block",
    position: "relative"
  },
  image: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%"
  },
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

export default function SearchResultCard(props: SearchResultCardProperties) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  //const [summary, setSummary] = useState("");
  let color = "";
  let risk = "";
  if (props.outcome === '1' || props.outcome === '2') {
    color = "red";
    risk = "High risk";
  }
  else if (props.outcome === '3' || props.outcome === '4') {
    color = "yellow";
    risk = "Medium risk"
  }
  else {
    color = "green"
    risk = "Low risk";
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={1}
          align-content="centre"
        >
          <Grid item className={classes.box}>
            <Box bgcolor={color}>{risk}</Box>
            <img className={classes.image} src={props.image} alt="Pet" />
            <p>{props.title}</p>
            <p>Basic Information:<br></br>Gender: {props.gender}<br></br>Age: {props.age}<br></br>Location: {props.location}</p>
            <a href={props.link}>More Info</a>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.actions}>
      </CardActions>
    </Card>
  );
}

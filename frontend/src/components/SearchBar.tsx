import React, { useMemo, useState } from "react";
import createStyles from "@material-ui/core/styles/createStyles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Search from "@material-ui/icons/Search";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      marginLeft: "40vw",
      padding: "auto"
    },
    search: {
      width: "32ch",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      "&:hover": {
        backgroundColor: fade(theme.palette.primary.main, 0.2)
      },
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      height: "100%"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 1),
      transition: theme.transitions.create("width"),
      width: "100%"
    }
  })
);

export default function SearchBar(props: {
  label: string;
  initialValue?: string;
  onSubmit: (input: string) => void;
}) {
  const classes = useStyles();
  const [query, setQuery] = useState(props.initialValue ?? "");
  const disableSubmit = useMemo(() => query.trim().length === 0, [query]);

  function submit() {
    if (!disableSubmit) {
      props.onSubmit(query);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <InputBase
          placeholder={props.label}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              submit();
            }
          }}
          inputProps={{ "aria-label": "search" }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
        />
        <IconButton
          className={classes.searchIcon}
          onClick={submit}
          disabled={disableSubmit}
        >
          <Search />
        </IconButton>
      </div>
    </div>
  );
}

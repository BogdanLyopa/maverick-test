import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getFilter } from "../../redux/customer/customerSelectors";
import { changedFilter } from "../../redux/customer/customerActions";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",

    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  inputInput: {
    border: "1px solid black",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),

    width: "250px",
  },
}));

export default function Filter() {
  const classes = useStyles();
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  const onChange = (event) => dispatch(changedFilter(event.target.value));
  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          type="text"
          name="filter"
          value={value}
          onChange={onChange}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </>
  );
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "@material-ui/core/Button";
import { Grid, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CardMedia from "@material-ui/core/CardMedia";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
//dayjs
import dayjs from "dayjs";
import Noimg from "../noimg.png";
import PostsDialog from './PostsDialog';

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 160,
    maxHeight: 150
  },
  content: {
    padding: 25,
    objectFit: "cover"
  },
  body2: {
    fontFamily: "Segoe UI",
    fontSize: "0.925rem"
  },
  username: {
    fontFamily: "Segoe UI",
    color: "#daaa00"
  },
  deleteButton: {
    position: "absolute",
    left: "90%"
  },
  favouriteicon: {
    color: "#daaa00"
  }
};

class Posts extends Component {
  state = {
    likepost: false
  };
  render() {
    let { likepost } = this.state;
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { body, createdAt, userid,  _id,userimage }
    } = this.props;

    return (
      <Card className={classes.card}>
         <img src={userimage} className={classes.image}  title="Profile image"></img>
        <CardContent className={classes.content}>
          <Grid container justify="space-between">
            <Grid item sm={11}>
              <Typography
                variant="h5"
                className={classes.username}
                component={Link}
                to="/Home"
              >
                {userid}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography
                variant="body1"
                className={classes.body2}
                color="textSecondary"
              >
                {dayjs(createdAt).fromNow()}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.body2} variant="body2">
                {body}
              </Typography>
            </Grid>
          </Grid>
          <Button
            className={classes.favouriteicon}
            onClick={() => this.setState({ likepost: !this.state.likepost })}
          >
            {likepost == false ? (
              <div>
                <ThumbUpIcon />{" "}
              </div>
            ) : (
              <div>
                <span>1</span>&nbsp;&nbsp;&nbsp; <ThumbUpIcon color="primary" />
              </div>
            )}
          </Button>
          {likepost == false ? <span>Like</span> : <span>Unlike</span>}
          <PostsDialog _id={_id} userid={userid} ></PostsDialog>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Posts);

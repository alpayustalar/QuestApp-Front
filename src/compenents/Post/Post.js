import React, { useState } from "react";
import { Avatar, CardActions, CardContent, CardHeader, Collapse, IconButton, Typography, makeStyles } from "@material-ui/core";
import clsx from 'clsx';
import { red } from "@material-ui/core/colors";
import Card from '@material-ui/core/Card';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        width: 800,
        textAlign: "left"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        backgroundColor: red[500],
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "white"
    }
}));


function Post(props) {
    const { title, text, userId, userName } = props;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [liked, setLiked] = useState(false); 
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = () => {
        setLiked(!liked);
    }


    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
                        <Avatar aria label='recipe' className={classes.avatar}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                }
                title={title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" compenent="p">
                    {text}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>

                <IconButton
                    onClick={handleLike}
                    aria-label="add to favorites">
                    <FavoriteIcon style={liked? {color: "red"} : null} />
                </IconButton>

                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>

                <CardContent>

                </CardContent>
            </Collapse>
        </Card>
    )
}

export default Post;
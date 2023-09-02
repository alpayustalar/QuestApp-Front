import { Button, Card, CardActions, CardContent, CardMedia, List, ListItem, ListItemSecondaryAction, Modal, Radio, Typography, makeStyles } from "@material-ui/core";
import { React, useState } from "react";
import { PutWithAuth } from '../../services/HttpService';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: 50
    },
    modal: {
        display: "flex",
        maxWidth: 200,
    },
});

function Avatar(props) {
    const { avatarId, userId, userName } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);

    const saveAvatar = () => {
        PutWithAuth("/users/" + localStorage.getItem("currentUser"), {
            avatar: selectedValue,
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        saveAvatar();
    };

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    element="img"
                    alt="User Avatar"
                    image={`/avatars/avatar${selectedValue}.png`}
                    title="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" element="h2">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" element="p">
                        User info
                    </Typography>
                </CardContent>
                <CardActions>
                    {localStorage.getItem("currentUser") == userId ? <Button size="small" color="primary" onClick={handleOpen}>
                        Change Avatar
                    </Button> : ""}
                </CardActions>
            </Card>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <List dense>
                    {[1, 2, 3, 4, 5, 6].map((key) => {
                        const labelId = `checkbox-list-secondary-label-${key}`;
                        return (
                            <ListItem key={key} button>
                                <CardMedia
                                    style={{ maxWidth: 100 }}
                                    element="img"
                                    alt={`Avatar n°${key}`}
                                    image={`/avatars/avatar${key}.png`}
                                    title="User Avatar"
                                />
                                <ListItemSecondaryAction>
                                    <Radio
                                        edge="end"
                                        value={key}
                                        onChange={handleChange}
                                        checked={"" + selectedValue === "" + key}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Modal>
        </div>
    );
}

export default Avatar;
import AppBar from '@material-ui/core/AppBar/AppBar';
import Fab from '@material-ui/core/Fab/Fab';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import {styles} from './mobileNav.styles';
import '.';
import { useHistory } from 'react-router-dom';

const MobileNav = () => {
    const classes = styles();
    const history = useHistory();
    const handlePageChange = (pageLink) => {
      history.push(pageLink);
    }

    return (
        <AppBar position="fixed" color="primary" className={`${classes.appBar} `}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open drawer" className={classes.iconButton} onClick={() => handlePageChange("/")}>
                    <HomeIcon fontSize="large" />
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="open drawer" className={classes.iconButton} onClick={() => handlePageChange("/search")}>
                    <SearchIcon fontSize="large" />
                </IconButton>
                <Fab aria-label="add" className={classes.fabButton} onClick={() => handlePageChange("/newRequest")}>
                    <AddIcon />
                </Fab>
                <div className={classes.grow} />
                <IconButton color="inherit" className={classes.iconButton} onClick={() => handlePageChange("/")}>
                    <NotificationsIcon fontSize="large" />
                </IconButton>
                <IconButton edge="end" color="inherit" className={classes.iconButton} onClick={() => handlePageChange("/profile")}>
                    <PersonIcon fontSize="large" />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default MobileNav

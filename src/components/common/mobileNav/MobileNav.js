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

const MobileNav = () => {
    const classes = styles();

    const handlePageChange = (pageLink) => {
      window.location.href = pageLink;
    }

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="open drawer" className={classes.iconButton}>
                    <HomeIcon fontSize="large" onClick={() => handlePageChange("/")}/>
                </IconButton>
                <IconButton edge="start" color="inherit" aria-label="open drawer" className={classes.iconButton}>
                    <SearchIcon fontSize="large" onClick={() => handlePageChange("/search")}/>
                </IconButton>
                <Fab aria-label="add" className={classes.fabButton}>
                    <AddIcon onClick={() => handlePageChange("/")}/>
                </Fab>
                <div className={classes.grow} />
                <IconButton color="inherit" className={classes.iconButton}>
                    <NotificationsIcon fontSize="large" onClick={() => handlePageChange("/")}/>
                </IconButton>
                <IconButton edge="end" color="inherit" className={classes.iconButton}>
                    <PersonIcon fontSize="large" onClick={() => handlePageChange("/profile")}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default MobileNav

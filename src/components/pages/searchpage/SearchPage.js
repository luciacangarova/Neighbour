import React from 'react'
import './searchpage.scss'
import {styles} from './searchPage.style';
import SearchBar from "material-ui-search-bar";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ExploreIcon from '@material-ui/icons/Explore';
import FilterListIcon from '@material-ui/icons/FilterList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { getRecords } from "../../../middleware/api.js";

const SearchPage = () => {
    const classes = styles();
    const [searchValue, setSearchValue] = React.useState('');
    const [requestList, setRequestList] = React.useState([]);
    const [filteredRequestList, setFilteredRequestList] = React.useState([]);

    React.useEffect(() => {
        getRecords("/all-requests").then(data => {setRequestList(data); setFilteredRequestList(data)});
    }, []);

    const handleSelectButton = (id) => {
        window.location.href = "request/"+id;
    }

    const doSearch = (value) => {
        let currentList = requestList;
        let newList = currentList.filter(item => {
                const lc = item.title.toLowerCase();
                const filter = value.toLowerCase();
                return lc.includes(filter);
            });
        setFilteredRequestList(newList);
    }

    const handleMapButton = () => {

    }

    const handleFilterButton = () => {

    }

    return (
        <div>
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction={"row"} justify="space-between">
                        <Grid item>
                            <SearchBar
                                value={searchValue}
                                onChange={(newValue) => {setSearchValue(newValue); doSearch(newValue);}}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.iconButton} onClick={handleMapButton}>
                                <ExploreIcon fontSize="default"/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton className={classes.iconButton} onClick={handleFilterButton}>
                                <FilterListIcon fontSize="default"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <List className={classes.root}>
                        {filteredRequestList.map(request => 
                            <ListItem alignItems="flex-start" className={classes.listItem} key={request.title}>
                                <div>
                                    {request.title}
                                    <Grid container direction="column">
                                        <Grid item >
                                            {request.description}
                                        </Grid>
                                        <Grid item >
                                            <br />
                                        </Grid>
                                        <Grid item >
                                            <Grid container direction="row" justify={"space-between"} className={classes.buttonBar} key={request.description}>
                                                <Grid item>
                                                    <Button size="small" className={classes.categoryButton} key={request.title}>{request.category}</Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button 
                                                        variant="contained" 
                                                        size="small" 
                                                        className={classes.selectButton} 
                                                        key={request.title}
                                                        onClick={()=>handleSelectButton(request.id)}
                                                    >
                                                        Select
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </ListItem>
                        )}
                    </List>
                </Grid>
            </Grid>

        </div>
    )
}

export default SearchPage
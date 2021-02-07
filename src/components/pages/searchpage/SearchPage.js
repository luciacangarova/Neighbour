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
import { useHistory } from "react-router-dom";
import * as QueryString from "query-string"
import StatusButton from "../../common/statusButton/StatusButton.js";
import CategoryIcon from "../../common/categoryIcon"

const SearchPage = (props) => {
    const classes = styles();
    const [filters, setFilters] = React.useState({})
    const [searchValue, setSearchValue] = React.useState('');
    const [requestList, setRequestList] = React.useState([]);
    const [filteredRequestList, setFilteredRequestList] = React.useState([]);
    const history = useHistory()
    React.useEffect(() => {
        getRecords("/all-requests").then(data => {
            setRequestList(data); 
            const filtrs = getFiltersFromUrl();
            setFilteredRequestList(
                filtrs && filtrs.category ? 
                data.filter(d=>  d.category.toLowerCase() === filtrs.category):
                data
            )}
        
        );
        getFiltersFromUrl();
    }, []);

    const handleSelectButton = (id) => {
        history.push("/request/"+id);
    }

    const doSearch = (value) => {
        console.log(filters);
        let currentList = requestList;
        let newList = currentList.filter(item => {
                const lc = item.title.toLowerCase();
                const filter = value.toLowerCase();
                if(filters && filters.category){
                   return lc.includes(filter) && item.category.toLowerCase() === filters.category; 
                }
                return lc.includes(filter);
            });
        setFilteredRequestList(newList);
    }

    const handleMapButton = () => {
        history.push("/map");
    }

    const handleFilterButton = () => {

    }

    const getFiltersFromUrl = () => {
        const params = QueryString.parse(props.location.search);
        setFilters({...params});
        return params;
    }

    return (
        <div className="search-page">
            <Grid container direction="column">
                <Grid item>
                    <Grid container direction={"row"} justify="space-between" className="top-bar">
                        <Grid item className="search-bar">
                            <SearchBar
                                value={searchValue}
                                onChange={(newValue) => {setSearchValue(newValue); doSearch(newValue);}}
                            />
                        </Grid>
                        <Grid item className="map-btn">
                            <IconButton className={classes.iconButton} onClick={handleMapButton}>
                                <ExploreIcon fontSize="default"/>
                            </IconButton>
                        </Grid>
                        <Grid item className="filter-btn">
                            <IconButton className={classes.iconButton} onClick={handleFilterButton}>
                                <FilterListIcon fontSize="default"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <List className={classes.root}>
                        {filteredRequestList.map(request => 
                            <ListItem alignItems="flex-start" className={classes.listItem} key={request.id}>
                                <div className="search-itm">
                                    <div className='itm-title'>
                                    {request.title}
                                    </div>
                                    
                                    <Grid container direction="column">
                                        <Grid item >
                                            {request.description}
                                        </Grid>
                                        <Grid item >
                                            <br />
                                        </Grid>
                                        <Grid item >
                                            <Grid container direction="row" justify={"space-between"} className={classes.buttonBar} key={request.description}>
                                                <Grid item className="labels">
                                                    <CategoryIcon category={request.category} /> 
                                                    <StatusButton key={request.title} status={request.category}/>  
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
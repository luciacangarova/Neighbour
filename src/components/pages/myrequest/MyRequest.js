import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import { SingleSelect } from "react-select-material-ui";
import Button from "@material-ui/core/Button";
import {styles} from "./myRequest.styles";
import { Auth } from "aws-amplify";
import { getRecords } from "../../../middleware/api.js";

const values = {
    title: "",
    description: "",
    category: "",
    location: "",
    expires_on: "",
    requester_id: "",
    helper_id: "",
    potential_helper_ids: ""
};

const volunteerObject = {
    id: "",
    location: ""
}

const MyRequest = (props) => {
    const classes = styles();
    const [detailValues, setDetailValues] = useState(values);
    const [volunteer, setVolunteer] = useState(volunteerObject)
    const [detailId, setDetailId] = useState(0);
    const [selectedVolunteerId, setSelectedVolunteerId] = useState('');

    React.useEffect(() => {
        setDetailId(props.match.params.id);
        getRecords("/request?id="+props.match.params.id).then(data => console.log(data));
    }, []);

    const handleVolunteerButton = (event) => {
        event.preventDefault();
        //window.location.href = "/";
    }

    const handleDropdownChange = (e) => {

    }

    return (
        <>
        <Grid container direction="column" className={classes.root}>
            {"My Request"}
            <Grid item>
                <TextField
                    id="title-input"
                    name="title"
                    label="Title"
                    type="text"
                    value={detailValues.title}
                    className={classes.textField}
                    disabled
                />
            </Grid>
            <Grid item>
                <div className={classes.dropdownPanel}>
                <InputLabel>Category</InputLabel>
                <SingleSelect
                    value={volunteer.id}
                    onChange={handleDropdownChange}
                    placeholder="Select a category"
                    //options={volunteers}
                />  
                </div>        
            </Grid>
            <Grid item>
                <TextField
                    id="location-input"
                    name="location"
                    label="Location"
                    type="text"
                    value={volunteer.location}
                    className={classes.textField}
                    disabled
                />
            </Grid>
            <Grid item>
                MAP HERE

            </Grid>
        </Grid>
        <Grid container alignItems="center" justify="center">
            <Grid item>
                <Button 
                    variant="contained" 
                    type="submit" 
                    className={classes.submitButton}
                    onClick={handleVolunteerButton}
                >
                    Select Volunteer
                </Button>
            </Grid>
        </Grid>
        </>
    );
};
export default MyRequest;
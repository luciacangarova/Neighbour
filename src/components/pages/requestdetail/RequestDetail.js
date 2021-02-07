import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { postRecords } from "../../../middleware/api.js";
import Button from "@material-ui/core/Button";
import {styles} from "./requestDetail.styles";
import { Auth } from "aws-amplify";
import { getRecords } from "../../../middleware/api.js";
import InputLabel from '@material-ui/core/InputLabel';
import { SingleSelect } from "react-select-material-ui";

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

const RequestDetail = (props) => {
    const classes = styles();
    const [detailValues, setDetailValues] = useState(values);
    const [detailId, setDetailId] = useState(0);
    const [userId, setUserId] = useState('');
    const [isMyRequest, setIsMyRequest] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [volunteer, setVolunteer] = useState(volunteerObject);
    const [selectedVolunteerId, setSelectedVolunteerId] = useState('');
    const [disableSelectButton, setDisableSelectButton] = useState(false);


    React.useEffect(() => {
        // fetch user ID
        getUserName();

        // set request ID
        setDetailId(props.match.params.id);

        // get request details
        getRecords("/request?id="+props.match.params.id).then( data => {
            setDetailValues(data)
            setIsMyRequest(data.requester_id===userId)
            setDisableButton(data.potential_helper_ids.includes(userId)? true : false)
            setDisableSelectButton(data.potential_helper_ids.length > 0? false : true)
        });
    }, []);

    const getUserName = async () => {
        const userObject = await Auth.currentUserInfo();
        setUserId(userObject ? userObject.attributes ? userObject.attributes.email: "John Doe": "John Doe" );
    }

    const handleVolunteerButton = (event) => {
        event.preventDefault();
        postRecords("/add-potential-helper", 
            {"id": detailId,
            "helper_id": userId,
            }
        );
        window.location.href = "/";
    }

    const handleSelectVolunteerButton = (event) => {
        event.preventDefault();
        postRecords("/accept_helper_for_request?id=" + detailId + "&helper_id=" + userId);
        //window.location.href = "/";
    }

    const handleDropdownChange = (e) => {
        setSelectedVolunteerId(e);
        getRecords("/get_user?id="+e).then( data => {
            console.log(data);
            let location
            setVolunteer({
                ...volunteer,
                location: location,
            })
        });
    }

    return (
        <>
        {!isMyRequest?
        <>
            <Grid container direction="column" className={classes.root}>
                {detailValues.title}
                <Grid item>
                    <TextField
                        id="description-input"
                        name="description"
                        label="Description"
                        type="text"
                        value={detailValues.description}
                        className={classes.textField}
                        disabled
                    />
                </Grid>
                <Grid item>
                    <TextField
                            id="category-input"
                            name="category"
                            label="Category"
                            type="text"
                            value={detailValues.category}
                            className={classes.textField}
                            disabled
                        />    
                </Grid>
                <Grid item>
                    <TextField
                        id="location-input"
                        name="location"
                        label="Location"
                        type="text"
                        value={detailValues.location}
                        className={classes.textField}
                        disabled
                    />
                </Grid>
                <Grid item>
                    MAP HERE

                </Grid>
                <Grid item>
                    <TextField
                        id="datetime-input"
                        label="Due date"
                        type="text"
                        name="expires_on"
                        value={detailValues.expires_on}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.textField}
                        disabled
                    />
                </Grid>
            </Grid>
            <Grid container alignItems="center" justify="center">
                <Grid item>
                    <Button 
                        variant="contained" 
                        type="submit" 
                        className={classes.submitButton}
                        onClick={handleVolunteerButton}
                        disabled={disableButton}
                    >
                        Volunteer
                    </Button>
                </Grid>
            </Grid>
        </>
        : 
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
                    <InputLabel>Volunteer</InputLabel>
                    <SingleSelect
                        value={volunteer.id}
                        onChange={handleDropdownChange}
                        placeholder="Select a volunteer"
                        options={detailValues.potential_helper_ids}
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
                        onClick={handleSelectVolunteerButton}
                        disabled={disableSelectButton}
                    >
                        Select Volunteer
                    </Button>
                </Grid>
            </Grid>
        </>        
        }
        </>
    );
};
export default RequestDetail;
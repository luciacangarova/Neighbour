import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { postRecords } from "../../../middleware/api.js";
import Button from "@material-ui/core/Button";
import {styles} from "./requestDetail.styles";
import { Auth } from "aws-amplify";
import { getRecords, putRecords } from "../../../middleware/api.js";
import InputLabel from '@material-ui/core/InputLabel';
import { SingleSelect } from "react-select-material-ui";
import Map from '../../common/map';
import { useHistory } from "react-router";
import StatusButton from "../../common/statusButton/StatusButton.js";
import "./requestpage.scss";

const values = {
  title: "",
  description: "",
  category: "",
  lat: "",
  long: "",
  expires_on: "",
  requester_id: "",
  helper_id: "",
  potential_helper_ids: "",
  status: "",
  location: ""
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
    const [disableVolunteerButton, setDisableVolunteerButton] = useState(false);
    const [volunteer, setVolunteer] = useState(volunteerObject);
    const [selectedVolunteerId, setSelectedVolunteerId] = useState('');
    const [disableSelectVolunteerButton, setDisableSelectVolunteerButton] = useState(false);

    const history = useHistory();


    React.useEffect(async () => {
        // fetch user ID
        const uId = await getUserName();

        // set request ID
        setDetailId(props.match.params.id);

        // get request details
        const data = await getRecords("/request?id="+props.match.params.id);
        setDetailValues(data)
        setIsMyRequest(data.requester_id===uId)
        setDisableVolunteerButton(data.potential_helper_ids.includes(uId)? true : false)
        setDisableSelectVolunteerButton(data.potential_helper_ids.length > 0? false : true)
    }, []);

    const getUserName = async () => {
        const userObject = await Auth.currentUserInfo();
        const uid = userObject ? userObject.attributes ? userObject.attributes.email: "John Doe": "John Doe";
        setUserId(uid);
        return uid;
    }

    const handleVolunteerButton = (event) => {
        event.preventDefault();
        postRecords("/add-potential-helper", 
            {"id": detailId,
            "helper_id": userId,
            }
        );
        history.push("/");
    }

    const handleStatusChange = (val) => {
        putRecords("/request?id="+detailId+"&status="+val);
        history.push("/");
    }

    const handleSelectVolunteerButton = (event) => {
        event.preventDefault();
        console.log(volunteer)
        postRecords("/accept_helper_for_request?id=" + detailId + "&helper_id=" + selectedVolunteerId);
        history.push("/");
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
        <div className="request-page">
            <div className="detail-header">
            <Grid container direction="column">
                    <Grid item>
                        <Grid container direction="row" justify={"space-between"}>
                            <Grid item className="heading">
                                {detailValues.title}
                            </Grid>
                            <Grid item className="status-wrp">
                                <StatusButton status={detailValues.status} />
                            </Grid>
                        </Grid>
                    </Grid>
            </Grid>
            </div>
            {!isMyRequest?
            <>
                <Grid container direction="column" className={classes.root}>                    
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
                            value={detailValues.lat + ", "+detailValues.long}
                            className={classes.textField}
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        {detailValues.lat? <Map 
                            centerLocation={{lat: detailValues.lat,
                                            lng: detailValues.long,
                                    }}
                            locations={[{lat: detailValues.lat,
                                        lng: detailValues.long,
                                        address: "Location",
                                        jobID: detailId
                                    }]}
                            zoomLevel={15}
                            myHistory={history}
                            height={"200px"}
                                /> 
                        : null}
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
                            disabled={disableVolunteerButton}
                        >
                            Volunteer
                        </Button>
                    </Grid>
                </Grid>
            </>
            : 
            <>
            <Grid container direction="column" className={classes.root}>
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
                {detailValues.status==="in progress" || detailValues.status==="completed" || detailValues.status==="uncompleted"?
                    <>
                        <TextField
                        id="volunteer-input"
                        name="volunteer"
                        label="Volunteer"
                        type="text"
                        value={detailValues.helper_id}
                        className={classes.textField}
                        disabled
                    />
                    </>
                :<>
                        <div className={classes.dropdownPanel}>
                        <InputLabel>Volunteer</InputLabel>
                        <SingleSelect
                            value={volunteer.id}
                            onChange={handleDropdownChange}
                            placeholder="Select a volunteer"
                            options={detailValues.potential_helper_ids}
                        />  
                        </div>    
                    </>  
                }  
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
            </Grid>
            
            <Grid container alignItems="center" justify="space-evenly" direction="column">
                {detailValues.status==="in progress" || detailValues.status==="completed" || detailValues.status==="uncompleted"?
                    <>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                className={classes.completeButton}
                                onClick={()=> handleStatusChange("completed")}
                                disabled={detailValues.status==="completed" || detailValues.status==="uncompleted"}
                            >
                                Mark as Completed
                            </Button>
                        </Grid>
                        <Grid item>
                            <br />
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                className={classes.uncompleteButton}
                                onClick={()=> handleStatusChange("uncompleted")}
                                disabled={detailValues.status==="completed" || detailValues.status==="uncompleted"}
                            >
                                Mark as Uncompleted
                            </Button>
                        </Grid>
                    </>
                :
                    <Grid item>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            className={classes.submitButton}
                            onClick={handleSelectVolunteerButton}
                            disabled={disableSelectVolunteerButton}
                        >
                            Select Volunteer
                        </Button>
                    </Grid>
                }      
            </Grid>
        </>        
        }
        </div>
    );
};
export default RequestDetail;
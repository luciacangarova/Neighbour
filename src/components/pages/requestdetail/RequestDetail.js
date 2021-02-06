import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { postRecords } from "../../../middleware/api.js";
import Button from "@material-ui/core/Button";
import {styles} from "./requestDetail.styles";
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

const RequestDetail = (props) => {
    const classes = styles();
    const [detailValues, setDetailValues] = useState(values);
    const [detailId, setDetailId] = useState(0);
    const [userId, setUserId] = useState('');

    React.useEffect(() => {
        const fetchUser = async () => {
            let userObject = await Auth.currentUserInfo()
            setUserId(userObject.attributes? userObject.attributes.email : "john.doe@mail.com");
        };
        fetchUser();
        setDetailId(props.match.params.id);
        getRecords("/request?id="+props.match.params.id).then(data => setDetailValues(data));
    }, []);

    const handleVolunteerButton = (event) => {
        event.preventDefault();
        postRecords("/add-potential-helper", 
            {"id": detailId,
            "helper_id": userId,
            }
        );
        window.location.href = "/";
    }

    return (
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
                >
                    Volunteer
                </Button>
            </Grid>
        </Grid>
        </>
    );
};
export default RequestDetail;
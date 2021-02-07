import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import { SingleSelect } from "react-select-material-ui";
import Button from "@material-ui/core/Button";
import {styles} from "./newRequest.style";
import { postRecords } from "../../../middleware/api.js";
import { Auth } from "aws-amplify";
import {CATEGORIES_LIST} from "../../../constants/categories.constants.js"
import { useHistory } from "react-router-dom"
import {ReactComponent as Logo} from '../../../logo.svg';
import './newrequest.scss';

const defaultValues = {
  title: "",
  description: "",
  category: "",
  location: "",
  expires_on: "",
  requester_id: ""
};

const NewRequest = () => {
    const history = useHistory();
    const classes = styles();
    const [formValues, setFormValues] = useState(defaultValues);
    const [categories, setCategories] = useState([]);
    const [myPosition, setMyPosition] = useState('');

    React.useEffect(() => {
        setCategories(CATEGORIES_LIST);

        const fetchUser = async () => {
            let userObject = await Auth.currentUserInfo()
            setFormValues({
                ...formValues,
                requester_id: userObject ? userObject.attributes? userObject.attributes.email : "john.doe@mail.com": "john.doe@mail.com",
            });
        };
        fetchUser();

        navigator.geolocation.getCurrentPosition((position)=> {  
            if (position)     
            setFormValues({
            ...formValues,
            location: position.coords.latitude + ", " + position.coords.longitude,
            });
            setMyPosition(position.coords.latitude + ", " + position.coords.longitude)
        });

    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
        ...formValues,
        [name]: value,
        });
    };

    const handleDropdownChange = (e) => {
        setFormValues({
            ...formValues,
            category: e,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postRecords("/request", {...formValues, location: myPosition? myPosition : "55.860916, -4.251433"});
        history.push("/");
    };

    return (
        <div className="create-page">
            <div className="home-header">
                <Logo />
            </div>
            <form onSubmit={handleSubmit}>
            <Grid container direction="column" className={classes.root}>
                <h2>New Request</h2>
                <Grid item>
                    <TextField
                        id="title-input"
                        name="title"
                        label="Title"
                        type="text"
                        value={formValues.title}
                        onChange={handleInputChange}
                        className={classes.textField}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="description-input"
                        name="description"
                        label="Description"
                        type="text"
                        value={formValues.description}
                        onChange={handleInputChange}
                        className={classes.textField}
                    />
                </Grid>
                <Grid item>
                    <div className={classes.dropdownPanel}>
                    <InputLabel>Category</InputLabel>
                    <SingleSelect
                        value={formValues.category}
                        onChange={handleDropdownChange}
                        placeholder="Select a category"
                        options={categories}
                    />  
                    </div>        
                </Grid>
                <Grid item>
                    <TextField
                        id="location-input"
                        name="location"
                        label="Location"
                        type="text"
                        value={myPosition}
                        className={classes.textField}
                        disabled
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="datetime-input"
                        label="Due date"
                        type="datetime-local"
                        name="expires_on"
                        defaultValue={formValues.expires_on}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.textField}
                    />
                </Grid>
            </Grid>
            <Grid container alignItems="center" justify="center">
                <Grid item className="submit-btn">
                    <Button variant="contained" type="submit" className={classes.submitButton}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
            </form>
        </div>
    );
};
export default NewRequest;
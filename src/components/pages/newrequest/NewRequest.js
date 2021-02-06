import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { SingleSelect } from "react-select-material-ui";
import Button from "@material-ui/core/Button";
import {styles} from "./newRequest.style";

const defaultValues = {
  title: "",
  description: "",
  category: "",
  location: "",
  dueDate: "",
  expireDate: ""
};

const NewRequest = () => {
    const classes = styles();
    const [formValues, setFormValues] = useState(defaultValues);
    const [categories, setCategories] = useState([]);

    React.useEffect(() => {
        setCategories(["example1","example2","example3","example4","example5","example6"]);
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
        console.log(formValues);
    };

    return (
        <form onSubmit={handleSubmit}>
        <Grid container direction="column" className={classes.root}>
            <p>New Request</p>
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
                    value={formValues.location}
                    onChange={handleInputChange}
                    className={classes.textField}
                />
            </Grid>
            <Grid item>
                <TextField
                    id="datetime-input"
                    label="Due date"
                    type="datetime-local"
                    value={formValues.dueDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.textField}
                />
            </Grid>
        </Grid>
        <Grid container alignItems="center" justify="center">
            <Grid item>
                <Button variant="contained" type="submit" className={classes.submitButton}>
                    Submit
                </Button>
            </Grid>
        </Grid>
        </form>
    );
};
export default NewRequest;
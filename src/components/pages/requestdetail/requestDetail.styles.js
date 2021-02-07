import makeStyles from '@material-ui/core/styles/makeStyles';

export const styles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "auto",
        backgroundColor: "#CBF1D2",
        borderRadius: 20,
        padding: "30px 30px",
        marginBottom: 30,
    },
    dropdownPanel: {
        paddingTop: 20,
    },
    submitButton: {
        backgroundColor: "#FFC000 !important",
    },
    textField: {
        width: "100%",
    },
    uncompleteButton:{
        backgroundColor: "#f5f5f5 !important",
        width: "250px",
    },
    completeButton:{
        backgroundColor: "#FFC000 !important",
        width: "250px",
    }
  }));
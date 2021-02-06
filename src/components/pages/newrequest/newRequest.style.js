import makeStyles from '@material-ui/core/styles/makeStyles';

export const styles = makeStyles((theme) => ({
    root: {
        width: "calc(100% - 10px)",
        height: "auto",
        backgroundColor: "#CBF1D2",
        borderRadius: 20,
        padding: 20,
        margin: 5,
    },
    dropdownPanel: {
        paddingTop: 20,
    },
    submitButton: {
        backgroundColor: "#FFC000 !important",
    },
    textField: {
        width: "100%",
    }
  }));
import makeStyles from '@material-ui/core/styles/makeStyles';

export const styles = makeStyles((theme) => ({
    iconButton: {
      marginLeft: 5,
      marginRight: 5,
    },
    listItem: {
        width: "calc(100% - 10px)",
        height: "calc(100% - 10px)",
        backgroundColor: "#CBF1D2",
        borderRadius: 20,
        margin: 5,
    },
    categoryButton: {
        backgroundColor: "#FFF2CC !important"
    },
    selectButton: {
        backgroundColor: "#FFC000 !important",
    }
  }));
import makeStyles from '@material-ui/core/styles/makeStyles';

export const styles = makeStyles((theme) => ({
    iconButton: {
      marginLeft: 5,
      marginRight: 5,
    },
    root: {
        width: '100%',
        overflow: 'scroll !important',
    },
    inline: {
        display: 'inline',
    },
    listItem: {
        width: 'auto',
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
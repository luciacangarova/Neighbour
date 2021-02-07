import makeStyles from '@material-ui/core/styles/makeStyles';

export const styles = makeStyles((theme) => ({
    appBar: {
      top: 'unset',
      bottom: 0,
      backgroundColor: "#436E4B",
      position: 'fixed'
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
      backgroundColor: "#CBF1D2",
    },
    iconButton: {
      marginLeft: 10,
      marginRight: 10,
    }
  }));
import React from 'react';
import Button from "@material-ui/core/Button";


const getBackgourndColor = (value) => {
    switch(value ? value.toLowerCase(): ""){
        case "open":
            return "#3f51b5";
        case "pending":
            return "lightyellow";
        case "in progress":
            return "lightblue";
        case "completed":
            return "lightgreen";
        default:
            return "#f5f5f5";
    }
}

const StatusButton = ({ status }) => (
    <Button size="small" style={{"backgroundColor": getBackgourndColor(status)}}>
        {status}
    </Button> 
)

export default StatusButton;
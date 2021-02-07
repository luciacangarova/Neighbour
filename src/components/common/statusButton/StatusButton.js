import React from 'react';
import Button from "@material-ui/core/Button";


const getBackgourndColor = (value) => {
    switch(value.toLowerCase()){
        case "open":
            return "red";
        case "pending":
            return "orange";
        case "in progress":
            return "yellow";
        case "completed":
            return "green";
        default:
            return "grey";
    }
}

const StatusButton = ({ status }) => (
    <Button size="small" style={{"backgroundColor": getBackgourndColor(status)}}>
        {status}
    </Button> 
)

export default StatusButton;
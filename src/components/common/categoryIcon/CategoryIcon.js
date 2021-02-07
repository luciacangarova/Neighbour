import React from 'react'
import LocalBarRounded from '@material-ui/icons/LocalBarRounded';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PetsIcon from '@material-ui/icons/Pets';
import PanToolIcon from '@material-ui/icons/PanTool';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';

const CategoryIcon = ( {category} ) => {
    
    const getIcon = () => {
        switch (category.toLowerCase()) {
            case "social":
                return <LocalBarRounded /> 
            case "favour":
                return <PanToolIcon />;
            case "exercise":
                return <DirectionsRunIcon />;
            case "pets":
                return <PetsIcon />;
            case "kids":
                return <ChildFriendlyIcon/>;

            default:
                return <LocalBarRounded /> 
        }
    }
    
    
    return (
        <div className="category-icon">
            {getIcon()}
        </div>
    )
}

export default CategoryIcon

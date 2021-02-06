import React from 'react'
import LocalBarRounded from '@material-ui/icons/LocalBarRounded';

const CategoryIcon = ( {category} ) => {
    
    const categories = ["social", "favor", "exercise", "pets", "children"]

    const getIcon = () => {
        console.log(category);
        switch (category.toLowerCase()) {
            case "social":
                console.log("yay")
                return <LocalBarRounded /> 
        
            default:
                break;
        }
    }
    
    
    return (
        <div className="category-icon">
            {getIcon()}
        </div>
    )
}

export default CategoryIcon

import React, {useEffect, useState} from 'react'
import './homepage.scss'
// import Avatar from '../avatar'
import {ReactComponent as Logo} from '../../../logo.svg';
import {Auth} from 'aws-amplify';
import {ReactComponent as Coins } from '../../../assets/coins.svg';
import CategoryIcon from '../../common/categoryIcon';


const HomePage = () => {
    const [user, setUser] = useState("");
    
    const getUserName = async () => {
        const userObject = await Auth.currentUserInfo();
        setUser(userObject ? userObject.attributes.email: "John Doe");
    }
    const my_requests = [
        {
            "id": 1,
            "category": "Social",
            "description": "I would like to go a walk",
            "expires_on": "2021-02-07T17:30:00",
            "requester_id": "0",
            "location": "55.864513, -4.261300"
        },
        {
            "id": 2,
            "category": "Social",
            "description": "I would like to go a walk",
            "expires_on": "2021-02-07T17:30:00",
            "requester_id": "0",
            "location": "55.864513, -4.261300"
        },
        {
            "id": 3,
            "category": "Social",
            "description": "I would like to go a walk",
            "expires_on": "2021-02-07T17:30:00",
            "requester_id": "0",
            "location": "55.864513, -4.261300"
        },
    ]
    
    useEffect(getUserName,[]);

    return (
        <div className="home-page">
            <div className="home-header">
                <Logo />
            </div>
            <div className="small-user">
                
                <div className="avatar">
                    
                </div>
                <h5 className="user-name">Welcome, {user}</h5>
                <div className="currency-info">
                    <Coins /> 
                    <p>12500 SocialCoins</p> 
                </div> 
            </div>
            <div className="my-requests">
                <h3>My requests</h3>
                <ul>
                    {
                        my_requests.map( r => 
                            <li key={r.id}>
                                <CategoryIcon  category={r.category}/>
                                <p>{r.description}</p>
                                <p className="status">Pending</p>
                            </li>
                        )
                    }
                </ul>
                <a className="btn">
                    Show more
                </a>

            </div>
            <div className="request-categories">

            </div>
            <div className="top-requests">

            </div>
        </div>
            
    )
}

export default HomePage

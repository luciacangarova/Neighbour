import React, {useState, useEffect} from 'react'
import './profile.scss'
import {ReactComponent as Logo} from '../../../logo.svg';
import {Auth} from 'aws-amplify';
import {ReactComponent as Coins } from '../../../assets/coins.svg';
import { AmplifySignOut } from '@aws-amplify/ui-react';




const Profile = () => {
    const [user, setUser] = useState("");
    const getUserName = async () => {
        const userObject = await Auth.currentUserInfo();
        setUser(userObject ? userObject.attributes ? userObject.attributes.email: "John Doe": "John Doe" );
    }
    useEffect(async ()=>{
        getUserName()        
    },[]);
    return (
        <div className="profile-page">
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

            <div className="sign-out">
                <AmplifySignOut />
            </div>
            
        </div>

    )
}

export default Profile
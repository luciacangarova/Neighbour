import React, {useEffect, useState} from 'react'
import './homepage.scss'
// import Avatar from '../avatar'
import {ReactComponent as Logo} from '../../../logo.svg';
import {Auth} from 'aws-amplify';
import {ReactComponent as Coins } from '../../../assets/coins.svg';
import CategoryIcon from '../../common/categoryIcon';
import { getRecords } from "../../../middleware/api.js";
import { fetchEmail } from "../../../functions/services"
import { request } from 'http';
import { Link } from 'react-router-dom';
import {CATEGORIES_LIST} from '../../../constants/categories.constants'


const HomePage = () => {
    const [user, setUser] = useState("");
    const [myRequests, setMyRequests] = useState([]);
    const [myJobs, setMyJobs] = useState([]);
    const [myEmail, setMyEmail] = useState([]);

    const fethRecords = async (email) => {
        const data = await getRecords("/all-requests");
        const requests = data.filter( r => r.requester_id === email);
        const jobs = data.filter( r => isHisJob(r, email));
        console.log(requests);
        console.log(jobs);
        setMyRequests([...requests]);
        setMyJobs([...jobs]);

    }

    const isHisJob = (job, email) => {
        if(job.helper_id) {
            return job.helper_id.S === email;
        }else {
            return job.potential_helper_ids && 
            job.potential_helper_ids.L.filter(id=> id === email).length > 0
        }
    }
    

    const getUserName = async () => {
        const userObject = await Auth.currentUserInfo();
        setUser(userObject ? userObject.attributes ? userObject.attributes.email: "John Doe": "John Doe" );
    }

    const categories = CATEGORIES_LIST
    useEffect(async ()=>{
        getUserName()
        const email = (await fetchEmail());
        await fethRecords(email);
        if(!myRequests) return false;
        
    },[]);

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
                        myRequests && myRequests.length > 0 &&
                        myRequests.map( r => 
                            <li key={r.id}>
                                <CategoryIcon  category={r.category}/>
                                <Link to={`request/${r.id}`}>{r.description}</Link>
                                <p className="status">{r.status.S}</p>
                            </li>
                        )
                    }
                </ul>
                <a className="btn">
                    Show more
                </a>

            </div>
            <h3>Explore</h3>
            <ul className="request-categories">
                {
                    categories.map( (c, index) =>
                        <li key={index}>
                            <Link to={`/search/?category=${c.toLowerCase()}`}>
                                <CategoryIcon category={c} />
                                <h5>{c}</h5>
                            </Link>
                        </li> 
                    )
                }
            </ul>
            <div className="top-requests">
                <h3>My jobs</h3> 
                <ul>
                    {
                        myJobs.map( r => 
                            <li key={r.id}>
                                <CategoryIcon  category={r.category}/>
                                <Link to={`request/${r.id}`}>{r.description}</Link>
                                <p className="status">{r.status.S}</p>
                            </li>
                        )
                    }
                </ul>

            </div>
        </div>
            
    )
}

export default HomePage

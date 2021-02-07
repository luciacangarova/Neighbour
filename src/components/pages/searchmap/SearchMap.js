import React from 'react';
import { useHistory } from 'react-router';
import Map from '../../common/map';
import { getRecords } from "../../../middleware/api.js";


const SearchMap = () => {
    //const classes = styles();
    const [requestList, setRequestList] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const history = useHistory()
    React.useEffect(() => {
        let data = [];
        getRecords("/all-requests").then(d => {setRequestList(d); data = d});

        // create locations
        let temp = [];
        data.map( request => {
            temp = [...temp, {
                lat: request.location.split(',')[0],
                lng: request.location.split(',')[1],
                address: request.title,
                jobID: request.id
            }]
        });
        setLocations(temp);
        console.log(temp)
    }, []);

    return(
        <>
            {locations? <Map 
                centerLocation={{lat: 0,
                                lng: 0,
                        }}
                locations={locations}
                zoomLevel={15}
                myHistory={history}
            />
            : null}
        </>
    );
}

export default SearchMap;
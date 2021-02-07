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
        getRecords("/all-requests").then(data => {
            setRequestList(data); 
                    // create locations
            let temp = [];
            data.map( request => {
                temp = [...temp, {
                    lat: request.lat? request.lat : "55.987",
                    lng: request.long? request.long : "-4.123",
                    address: request.title,
                    jobID: request.id
                }]
            });
            setLocations(temp);
        });
    }, []);

    return(
        <>
            {locations.length>0? <Map 
                centerLocation={{lat: "55.86944",
                                lng: "-4.3057152",
                        }}
                locations={locations}
                zoomLevel={13}
                myHistory={history}
                height={"600px"}
            />
            : null}
        </>
    );
}

export default SearchMap;
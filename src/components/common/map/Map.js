import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import GoogleMapReact from 'google-map-react';
import './map.scss'

const LocationPin = ({ text, jobID, myHistory }) => (
    <div className="pin">
      <RoomIcon color="inherit" className="pin-icon" onClick={()=> myHistory.push("request/"+jobID)}/>
      <p className="pin-text">{text}</p>
    </div>
)

const Map = ({ centerLocation, locations, zoomLevel, myHistory }) => {

    
    return(
    <div className="map">  
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBmLaJiAdbjKlAWrfIN54VlF0KX9i6NsOg' }}
          defaultCenter={{lat: Number(centerLocation.lat), lng: Number(centerLocation.lng)}}
          defaultZoom={zoomLevel}
        >
            {locations.map(location => 
                <LocationPin
                    key={locations.indexOf(location)}
                    lat={Number(location.lat)}
                    lng={Number(location.lng)}
                    text={location.address}
                    jobID={location.jobID}
                    myHistory={myHistory}
                />
            )}
        </GoogleMapReact>
      </div>
    </div>
)}

export default Map;
  
import { Grid2 as Grid } from "@mui/material";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  useMap
} from '@vis.gl/react-google-maps';
import AppLabelComponent from "components/AppComponents/AppLabelComponent";
import { useEffect, useRef, useState } from 'react';
import "./style.css";

const API_KEY =import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const CommunityAddress = ({ handleChange, formValues, touched, errors,setFieldValue }) => {
  return (
    <APIProvider apiKey={API_KEY}>
      <MapWithAutocomplete
        handleChange={handleChange}
        formValues={formValues}
        touched={touched}
        errors={errors}
        setFieldValue={setFieldValue}
      />
    </APIProvider>
  );
};

const MapWithAutocomplete = ({ handleChange, formValues, touched, errors,setFieldValue }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const inputRef = useRef(null);
  
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null); // Store the position of the marker
  const [address, setAddress] = useState(""); // Default to empty string

  const map = useMap();  // Access the map instance
/* global google*/
  // Initialize the Google Places Autocomplete
  useEffect(() => {
    const { places } = google.maps;
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setSelectedPlace(place);
      if (place.geometry && place.geometry.location) {
        setMarkerPosition(place.geometry.location);
        setFieldValue("communityAddress", place.formatted_address)
        setAddress(place.formatted_address || ""); // Update address with the selected place's formatted address
      }
    });
  }, []);

  // Update the map when a place is selected
  useEffect(() => {
    if (!selectedPlace || !map) return;

    // Adjust map based on selected place
    if (selectedPlace.geometry?.viewport) {
      map.fitBounds(selectedPlace.geometry.viewport);
    } else if (selectedPlace.geometry?.location) {
      map.panTo(selectedPlace.geometry.location);
    }
  }, [selectedPlace, map]);
const handleAddressChange=(event)=>{
handleChange(event)
setAddress(event.target.value)
setFieldValue("communityAddress", event.target.value)
}
  return (
    <div style={{ height: '30vh' }}>
      <Grid
        container
        textAlign={"center"}
        justifyContent={"center"}
        rowSpacing={4}
      >
        <Grid item>
          <AppLabelComponent
            gap={2}
            variant="h4"
            label={"What is the address of your community?"}
          />
        </Grid>
      </Grid>

      <Map
        mapId={"bf51a910020fa25a"}
        defaultZoom={3}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling="greedy"
        disableDefaultUI={true}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Pin the marker at the selected position */}
        {markerPosition && (
          <AdvancedMarker position={markerPosition} />
        )}
      </Map>

      <div className="autocomplete-container">
        <input
          ref={inputRef}
          placeholder="Search for a place..."
          style={{
            padding: '8px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
          onSearch
          onChange={handleAddressChange}
          name="communityAddress"
          error={touched.communityAddress && errors.communityAddress}
          value={address || formValues?.communityAddress || ""}  // Bind the address to the input value
          required={true}
        />
      </div>
    </div>
  );
};

export default CommunityAddress;

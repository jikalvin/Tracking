import React , {useState} from "react";
import { useParams} from 'react-router-dom';
import { bookings } from "../../firebaseInit";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Stack } from "@mui/material";
import { useMemo } from "react";
import "../../views/Main/mapstyle.css"
import Product from "./Product";
import Product1 from "./Product1";
import CircularProgress from '@mui/material/CircularProgress';
import getDistance from "../../utils/distance";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import {Box} from "@mui/material";

const Show = ()=> {
    const [loading, setLoading] = useState(true)
    const params = useParams();
    console.log(params)
    const[bks, setBks] = useState([]);
    bookings.doc(params.id).get().then((snapshot) => {
        const data = snapshot.data()
        setBks(data);
        setLoading(false)
    });

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAY6Fe3SWVJqR0zoSlW71-OZGt1Edme60A",
      });
    console.log("Origin, ", bks.origin)
    const center = useMemo(() => (bks ? bks.origin : {lat: 5.9630513, lng: 10.1591213} ), [bks]);
    const loc2 = useMemo(() => (bks ? bks.destination : {lat: 5.9630513, lng: 10.1591213} ), [bks]);
    const distance = useMemo(() => (bks.origin != undefined ? getDistance(bks.origin, bks.destination) : "Calculating Distance..." ), [bks]);

    return(
        <div style={{width: "100vw"}}>
            {!loading ? <Product1 distance={distance} booking={bks} /> : <Box sx={{ display: 'flex', justifyContent:"center", alignItems:"center", height: "100vh" }}>
      <CircularProgress />
    </Box>}
            {!loading && <Stack
                sx={{
                    width: "100vw",
                    height: "100vh",
                    margin: "auto"
                }}
            >
                {!isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                        mapContainerClassName="map-container"
                        center={center}
                        zoom={5}
                    >
                        {/* <Marker position={{lat: 5.9630513, lng: 10.1591213} } /> */}
                        <Marker position={bks ? bks.origin : {lat: 5.9630513, lng: 10.1591213} }/>
                        <Marker position={loc2 ? loc2 : {lat: 5.9630513, lng: 10.1591213}} />
                    </GoogleMap>
                )}
            </Stack>}
        </div>
    );
};
export default Show;
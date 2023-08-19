import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { bookings } from "../../firebaseInit";
import { Snackbar } from '@mui/material';
import {Alert} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const CCODE = Array.from(Array(12), () => Math.floor(Math.random() * 36).toString(36)).join('');;

const Form1 = () => {
  const classes = useStyles();

  const [shipperName, setShipperName] = useState("");
  const [shipperPhoneNumber, setShipperPhoneNumber] = useState("");
  const [shipperAddress, setShipperAddress] = useState("");
  const [shipperEmail, setShipperEmail] = useState("");

  const [receiverName, setReceiverName] = useState("");
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");

  const [shipmentType, setShipmentType] = useState("");
  const [weight, setWeight] = useState("");
  const [packages, setPackages] = useState("");
  const [product, setProduct] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [carrier, setCarrier] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [comments, setComments] = useState("");
  const [courier, setCourier] = useState("");
  const [mode, setMode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalFreight, setTotalFreight] = useState("");
  const [carrierReference, setCarrierReference] = useState("");
  const [origin, setOrigin] = useState("");
  const [loading, setLoading] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [valO, setValO] = useState("");
  const [valD, setValD] = useState("");

  const handleClose = () => {
    setOpen(false)
    }
  const handleError = () => {
    setError(false)
    }

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {console.log('Success', latLng); setDestination(latLng)})
      .catch(error => console.error('Error', error));
  };
const handleSelect1 = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {console.log('Success', latLng); setOrigin(latLng)})
      .catch(error => console.error('Error', error));
  };

  useEffect(() => {
    const fetchCityName = async () => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${origin != "" ? origin.lat : ""},${origin!=""?origin.lng:""}&key=AIzaSyAY6Fe3SWVJqR0zoSlW71-OZGt1Edme60A`);
        const data = await response.json();
        if (data.results.length > 0) {
          const city = data.results[0].address_components.find(component =>
            component.types.includes('locality')
          );
          setValO(city.long_name);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCityName();
  }, [origin]);
  
  useEffect(() => {
    const fetchCityName = async () => {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${destination != "" ? destination.lat : ""},${destination!=""?destination.lng:""}&key=AIzaSyAY6Fe3SWVJqR0zoSlW71-OZGt1Edme60A`);
        const data = await response.json();
        if (data.results.length > 0) {
          const city = data.results[0].address_components.find(component =>
            component.types.includes('locality')
          );
          setValD(city.long_name);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCityName();
  }, [destination]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    bookings.add ({
        code: CCODE,
        shipperName: shipperName,
        shipperPhoneNumber: shipperPhoneNumber,
        shipperAddress: shipperAddress,
        shipperEmail: shipperEmail,
        receiverName: receiverName,
        receiverPhoneNumber: receiverPhoneNumber,
        receiverAddress: receiverAddress,
        receiverEmail: receiverEmail,
        shipmentType: shipmentType,
        weight: weight,
        packages: packages,
        product: product,
        paymentMethod: paymentMethod,
        carrier: carrier,
        departureTime: departureTime,
        destination: destination,
        pickupTime: pickupTime,
        comments: comments,
        courier: courier,
        mode: mode,
        quantity: quantity,
        totalFreight: totalFreight,
        carrierReference: carrierReference,
        origin: origin,
        pickupDate: pickupDate,
        expectedDeliveryDate: expectedDeliveryDate
    }).then((docRef)=> {
        alert("data successfully submit")
        setOpen(true)
        setLoading(false)
    }).catch((error) => {
        console.error("error:", error);
        setError(true)
        setLoading(false)
        alert("An error occured", error)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
        <Typography>
            (Code for this track is {CCODE})
        </Typography>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Added successfully!
            </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleError}>
            <Alert onClose={handleError} severity="success" sx={{ width: '100%' }}>
                Added successfully!
            </Alert>
        </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
            <Typography variant="h5" style={{ mb: 2, textAlign: "center", fontWeight: "bold", padding: "5px"}}>
                Shipper's Details
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Shipper Name"
            value={shipperName}
            onChange={(e) => setShipperName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            value={shipperPhoneNumber}
            onChange={(e) => setShipperPhoneNumber(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address"
            value={shipperAddress}
            onChange={(e) => setShipperAddress(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            value={shipperEmail}
            onChange={(e) => setShipperEmail(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
            <Typography variant="h5" style={{ mb: 2, textAlign: "center", fontWeight: "bold", padding: "5px"}}>
                Receiver's Details
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Receiver's Name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            value={receiverPhoneNumber}
            onChange={(e) => setReceiverPhoneNumber(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Address"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
            <Typography variant="h5" style={{ mb: 2, textAlign: "center", fontWeight: "bold", padding: "5px"}}>
                Shipment Details
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Shipment Type</InputLabel>
            <Select
              value={shipmentType}
              onChange={(e) => setShipmentType(e.target.value)}
            >
              <MenuItem value="type1">Type 1</MenuItem>
              <MenuItem value="type2">Type 2</MenuItem>
              <MenuItem value="type3">Type 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Packages"
            value={packages}
            onChange={(e) => setPackages(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Payment Mode</InputLabel>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="method1">Method 1</MenuItem>
              <MenuItem value="method2">Method 2</MenuItem>
              <MenuItem value="method3">Method 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Carrier</InputLabel>
            <Select
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
            >
              <MenuItem value="carrier1">Carrier 1</MenuItem>
              <MenuItem value="carrier2">Carrier 2</MenuItem>
              <MenuItem value="carrier3">Carrier 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControl}>
            <label style={{textAlign:"start", color:"grey"}}>Departure Time</label>
            <input 
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                style={{height: "100%"}} 
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControl}>
            <PlacesAutocomplete
                    value={destination}
                    onChange={(address) => setDestination(address)}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <label style={{textAlign:"start", color:"white"}}>Destination</label>
                        <input
                        {...getInputProps({
                            placeholder: 'Destination ...',
                            className: 'location-search-input',
                        })}
                        style={{width: "100%"}}
                        />
                        <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                            <div
                                {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                                })}
                            >
                                <span>{suggestion.description}</span>
                            </div>
                            );
                        })}
                        </div>
                    </div>
                    )}
                </PlacesAutocomplete>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth className={classes.formControl}>
            <label style={{textAlign:"start", color:"grey"}}>Pick Up Time</label>
            <input 
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                style={{height: "100%"}} 
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Courier"
            value={courier}
            onChange={(e) => setCourier(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel>Mode</InputLabel>
            <Select value={mode} onChange={(e) => setMode(e.target.value)}>
              <MenuItem value="mode1">Mode 1</MenuItem>
              <MenuItem value="mode2">Mode 2</MenuItem>
              <MenuItem value="mode3">Mode 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Total Freight"
            value={totalFreight}
            onChange={(e) => setTotalFreight(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Carrier Reference Number"
            value={carrierReference}
            onChange = {(e) => setCarrierReference(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth className={classes.formControl}>
            <PlacesAutocomplete
                    value={origin}
                    onChange={(address) => setOrigin(address)}
                    onSelect={handleSelect1}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <label style={{textAlign:"start", color:"white"}}>Origin...</label>
                        <input
                        {...getInputProps({
                            placeholder: 'Origin ...',
                            className: 'location-search-input',
                        })}
                        style={{width: "100%"}}
                        />
                        <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                            <div
                                {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                                })}
                            >
                                <span>{suggestion.description}</span>
                            </div>
                            );
                        })}
                        </div>
                    </div>
                    )}
                </PlacesAutocomplete>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth className={classes.formControl}>
                <label style={{textAlign:"start", color:"grey"}}>Pick Up Date</label>
                <input 
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    style={{height: "100%"}} 
                />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth className={classes.formControl}>
            <label style={{textAlign:"start", color:"grey"}}>Delivery Date</label>
            <input 
                type="date"
                value={expectedDeliveryDate}
                onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                style={{height: "100%"}} 
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
        <Button type="submit" disabled={loading} variant="contained" color="primary">
            {loading? "Loading ..." : "Submit"}
        </Button>
        </Grid>
    </Grid>
    </form>
  )
}

export default Form1;
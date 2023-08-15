import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { db, bookings } from '../../firebaseInit';
import { Snackbar } from '@mui/material';
import {Alert} from '@mui/material';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';


const CCODE = Array.from(Array(12), () => Math.floor(Math.random() * 36).toString(36)).join('');;
// const CCODE = Math.floor(100000 + Math.random() * 900000);

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Checkout() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [dept, setDept] = useState(null)
    const [arr, setArr] = useState(null)

    const handleClose = () => {
        setOpen(false)
    }
    const handleDept = (address) => {
        setDept(address)
    }
    const handleArr = (address) => {
        setArr(address)
    }

    const handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {console.log('Success', latLng); setDept(latLng)})
          .catch(error => console.error('Error', error));
      };
    const handleSelect1 = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {console.log('Success', latLng); setArr(latLng)})
          .catch(error => console.error('Error', error));
      };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('emailS'),
      password: data.get('DDate'),
    });

    setLoading(true)
    bookings.add ({
        SFName: data.get("firstNameS"),
        SLName: data.get("lastNameS"),
        SPhone: data.get("phoneS"),
        SAddress: data.get("addressS"),
        SEmail: data.get("emailS"),
        RFName: data.get("firstNameR"),
        RLName: data.get("lastNameR"),
        RPhone: data.get("phoneR"),
        RAddress: data.get("addressR"),
        REmail: data.get("emailR"),
        typeShipment: data.get("typeShipment"),
        courier: data.get("courier"),
        packages: data.get("packages"),
        product: data.get("product"),
        destination: dept,
        origin: arr,
        DDate: data.get("DDate"),
        ADate: data.get("ADate"),
        code: CCODE,
    }).then((docRef)=> {
        alert("data successfully submit")
        setOpen(true)
        setLoading(false)
    }).catch((error) => {
        console.error("error:", error);
        alert("An error occured", error)
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Added successfully!
                </Alert>
            </Snackbar>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography component="h1" variant="h5" sx={{
                padding: 5
            }}>
                Shipper Details
            </Typography>
            <Typography>
                  (Code for this track is {CCODE})
              </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstNameS"
                  required
                  fullWidth
                  id="firstNameS"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastNameS"
                  label="Last Name"
                  name="lastNameS"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailS"
                  label="Email Address"
                  name="emailS"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneS"
                  label="Phone Number"
                  name="phoneS"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="addressS"
                  label="Address"
                  name="addressS"
                />
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5" sx={{
                padding: 5
            }}>
                Receiver Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstNameR"
                  required
                  fullWidth
                  id="firstNameR"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastNameR"
                  label="Last Name"
                  name="lastNameR"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailR"
                  label="Email Address"
                  name="emailR"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneR"
                  label="Phone Number"
                  name="phoneR"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="addressR"
                  label="Address"
                  name="addressR"
                />
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5" sx={{
                padding: 5
            }}>
                Shipment Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="typeShipment"
                  required
                  fullWidth
                  id="typeShipment"
                  label="Type Of Shipment"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="courier"
                  label="Courier"
                  name="courier"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="packages"
                  label="Packages"
                  name="packages"
                  type='number'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="product"
                  label="Product"
                  name="product"
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  required
                  fullWidth
                  id="destination"
                  label="Destination"
                  name="destination"
                /> */}
                {/* <PlacesPicker
                    gMapsKey='AIzaSyAY6Fe3SWVJqR0zoSlW71-OZGt1Edme60A'
                    placeId={dept}
                    onChange={setDept}
                /> */}
                <PlacesAutocomplete
                    value={dept}
                    onChange={handleDept}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                        {...getInputProps({
                            placeholder: 'Place Of Origin ...',
                            className: 'location-search-input',
                        })}
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
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  required
                  fullWidth
                  id="origin"
                  label="Origin"
                  name="origin"
                /> */}
                {/* <PlacesPicker
                    gMapsKey='AIzaSyAY6Fe3SWVJqR0zoSlW71-OZGt1Edme60A'
                    placeId={arr}
                    onChange={setArr}
                /> */}
                <PlacesAutocomplete
                    value={arr}
                    onChange={handleArr}
                    onSelect={handleSelect1}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                        {...getInputProps({
                            placeholder: 'Destination ...',
                            className: 'location-search-input',
                        })}
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
              </Grid>
              <Grid item xs={12}>
                <Typography>Departure Time</Typography>
                <input type='date' name="DDate" id="DDate" />
              </Grid>
              <Grid item xs={12}>
                <Typography>Arrival Time</Typography>
                <input type='date' name="ADate" id="ADate" />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Loading" : "Add"}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add
          </Typography>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
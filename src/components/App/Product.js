import React from 'react';
import { Typography, Grid } from '@mui/material';

const Product = ({ booking }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Type of shipment: {booking.typeShipment}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Packages: {booking.packages}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Product: {booking.product}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Date of sending: {booking.DDate}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Date of arrival: {booking.ADate}</Typography>
      </Grid>
      {/* Add more booking information as needed */}
    </Grid>
  );
};

export default Product;

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import TableWithMui from "./TableDown"

const ShipmentTrackingReceipt = ({bks, origin, destination}) => {

  const rows1 = ["Qty", "Piece Type", "Description", "Length(cm)", "Width(cm)", "Height(cm)", "Weight(kg)"]
  const rows2 = ["Date", "Time", "Location", "Status", "Updated By", "Remarks"]

  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" style={{ mb: 2, textAlign: "center", fontWeight: "bold", padding: "5px"}}>
              Shipment Status Out For Delivery
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Origin:</Typography>
                <Typography variant="body1">{origin}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Package:</Typography>
                <Typography variant="body1">{bks.packages}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Status:</Typography>
                <Typography variant="body1">In transit</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Destination:</Typography>
                <Typography variant="body1">{destination}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Carrier:</Typography>
                <Typography variant="body1">
                  {bks.carrier}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Type of Shipment:</Typography>
                <Typography variant="body1">{bks.shipmentType}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Weight:</Typography>
                <Typography variant="body1">{bks.weight}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Shipment Mode:</Typography>
                <Typography variant="body1">{bks.mode}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Carrier Reference No:</Typography>
                <Typography variant="body1">{bks.carrierReference}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Product:</Typography>
                <Typography variant="body1">{bks.product}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Qty:</Typography>
                <Typography variant="body1">
                  {bks.quantity}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Payment Mode:</Typography>
                <Typography variant="body1">{bks.paymentMethod}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Total Freight:</Typography>
                <Typography variant="body1">{bks.totalFreight}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Expected Delivery Date:</Typography>
                <Typography variant="body1">{bks.expectedDeliveryDate}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Departure Time:</Typography>
                <Typography variant="body1">{bks.departureTime}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Pick-up Date:</Typography>
                <Typography variant="body1">
                  {bks.pickupDate}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" style={{fontWeight: "bold"}}>Pick-up Time:</Typography>
                <Typography variant="body1">{bks.pickupTime}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TableWithMui title={"Packages"} rws={rows1} bks={bks} />
        </Grid>
        {/* <Grid item xs={12}>
          <TableWithMui title={"Shipment History"} rws={rows2} bks={bks} />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default ShipmentTrackingReceipt;

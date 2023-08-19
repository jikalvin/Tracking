import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme, rws) => ({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    backgroundColor: 'green',
    color: 'white',
  },
}));

const data = [
    {
      qty: 1,
      pieceType: 'Type 1',
      description: 'Description 1',
      length: 10,
      width: 20,
      height: 30,
      weight: 2.5,
    },
    {
      qty: 2,
      pieceType: 'Type 2',
      description: 'Description 2',
      length: 15,
      width: 25,
      height: 35,
      weight: 3.2,
    },
    // Add more data as needed
  ];

const TableWithMui = ({title, rws, bks}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
        <Typography variant="h5" style={{ mb: 2, textAlign: "center", fontWeight: "bold"}}>
              {title}
        </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {rws.map((item, index) => (
              <TableCell key={index} className={classes.tableHeader}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>{bks.quantity}</TableCell>
              <TableCell>{bks.shipmentType}</TableCell>
              <TableCell>{bks.comments}</TableCell>
              <TableCell>x</TableCell>
              <TableCell>x</TableCell>
              <TableCell>x</TableCell>
              <TableCell>{bks.weight}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableWithMui;

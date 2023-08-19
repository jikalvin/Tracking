import { Stack, Table, TextField, Typography} from "@mui/material"
import { Container, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect,useRef, useMemo } from 'react';
import { useLoadScript } from "@react-google-maps/api";
import { Button, Grid } from '@mui/material';

import "./mapstyle.css"

import { bookings } from "../../firebaseInit";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function(){
    const [bks, setBks] = useState([])
    const [loading, setLoading] = useState(true)
    const isMounted = useRef(false);

    const [search, setSearch] = useState("");
    const [filteredContacts, setFilteredContacts] = useState([]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAY6Fe3SWVJqR0zoSlW71-OZGt1Edme60A",
      });
      const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

    useEffect(() =>{
        isMounted.current = true;
        bookings.limit(100).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
            setBks(data);
            setLoading(false)
        });

        return () => isMounted.current = false;
    }, []);

    useEffect(() => {
        setFilteredContacts(
          bks.filter(
            (bk) =>
              bk.code.toString().toLowerCase().includes(search.toLowerCase()) ||
              bk.code.toString().toLowerCase().includes(search.toLowerCase())
          )
        );
      }, [search, bks]);

    return(
        <Grid container spacing={1} alignItems={"center"} justifyContent={"center"} style={{height: "90vh"}}>
            <Grid item>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography sx={{textAlign: "center"}} variant="h6">Enter the consignment number</Typography>
                    <TextField 
                        fullWidth
                        type="search" 
                        label="Search" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon
                                    style={{
                                        cursor: "pointer",
                                    }}
                                />
                            </InputAdornment>
                            ),
                        }}
                    />
                    <Button variant="contained" color="primary" fullWidth style={{marginTop: "0.8em"}} >
                        Search
                    </Button>
                </Grid>
                {search === "" ? "" : <Grid item xs={12} sx={{
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    {loading ? <h3>Loading Info...</h3> :<Table 
                        style={{
                            width:'95%',
                            display:'block',
                            overflowX:'auto'
                        }}    
                    >
                    <TableHead>
                        <TableRow>
                            <TableCell>Sender's Name</TableCell>
                            <TableCell align="right">Product</TableCell>
                            <TableCell align="right">Code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredContacts.map((row) => (
                        <TableRow
                        key={row.code}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.shipperName}
                        </TableCell>
                        <TableCell align="right">{row.product}</TableCell>
                        <TableCell align="right">{row.code}</TableCell>
                        <TableCell align="right">
                            <a href={"/show/" + row.id}>View</a>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    </Table>}
                </Grid>}
            </Grid>
        </Grid>
    )
}
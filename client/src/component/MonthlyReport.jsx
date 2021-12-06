import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import React, { useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { Container } from "reactstrap";
import RecordTable from './RecordTable';
import axios from 'axios';
let MonthlyReport = () => {
    let [monthNumber, setMonthNumber] = React.useState(new Date().getMonth());
    let [yearNumber, setYearNumber] = React.useState(new Date().getFullYear());
    let [response,setReponse]=React.useState([]);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let years = [date.getFullYear()];

    for (let i = 1; i <= 5; i++) {
        years[i] = (date.getFullYear() - i);
    }
    useEffect(()=>{
        console.log("getting table data based on month and year in monthlyReport.jsx")
        getData();
    },[])

    for (let i = 1; i <= 5; i++) {
        years[i] = (date.getFullYear() - i);
    }

    let getData=async()=>{
        let data={
            'month':monthNumber+1,
            'year':yearNumber
        }
        console.log("month data"+JSON.stringify(data));
        let url="http://localhost:5000/api/record/getByMonthAndYear";
        let res=await axios.post(url,data);
        console.log(res.data.data)
        if(res.data.status==200){
            setReponse(res.data.data);
        }
    }

    // getData();
    return (
        <>
            <Container className='card card-signin flex-row my-5 shadow-lg p-3 mb-5 bg-white rounded text-center'>
                <div style={{ textAlign: 'center' }}>
                    <h1>Monthly Report</h1>
                    <FormControl sx={{ m: 1, minWidth: 190 }}>
                        <InputLabel id="month">Month</InputLabel>
                        <Select
                            labelId="month"
                            id="month"
                            label="Month"
                            value={monthNumber}
                            onChange={e => setMonthNumber(e.target.value)}>

                            { months.map((month, index) => (
                                    <MenuItem value={index}>{month}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 190 }}>
                        <InputLabel id="year">Year</InputLabel>
                        <Select
                            labelId="year"
                            id="year"
                            label="year"
                            value={yearNumber}
                            onChange={e => setYearNumber(e.target.value)}>

                            { years.map((year) => (
                                    <MenuItem value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="outlined" className='mt-3 ml-3' startIcon={<SearchIcon />} onClick={getData}>
                        Search
                    </Button>
                    <RecordTable data={response} />
                </div>
            </Container>
        </>
    );
}

export default MonthlyReport;

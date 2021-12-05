import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Card, DialogTitle, TextField } from "@mui/material";
import TimePicker from "@mui/lab/TimePicker";
import DatePicker from "@mui/lab/DatePicker";
import Dialog from "@mui/material/Dialog";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Grid from "@mui/material/Grid";
import { Col, Form, FormGroup, Label, Input, FormText, Row } from "reactstrap";
import { Alert } from "react-bootstrap";
import axios from "axios";

function AddRecord() {
  const [startTime, setStartTime] = React.useState(
    new Date()
  );
  const [endTime, setEndTime] = React.useState(new Date());
  const [date, setDate] = React.useState(new Date());
  const [amount, setAmount] = React.useState("0");
  const [description, setDescription] = React.useState(" ");
  const [openErrorAlert, setErrorAlert] = React.useState(false);
  const [openSuccessAlert, setSuccessAlert] = React.useState(false);
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      amount: amount,
      description: description,
    };
    let response = await axios.post(
      "https://workreport-v1.herokuapp.com/api/record/addRecord",
      // "http://localhost:5000/api/record/addRecord",
      data
    );

    if (response) {
      console.log(response.data);
      if(response.data.status==201){
        setErrorAlert(false);
        setSuccessAlert(true);
        setTimeout(()=>{
          setSuccessAlert(false);
        },5000);
      }
      else{
        setSuccessAlert(false);
        setErrorAlert(true);
      }
    } else {
      console.log(response);
    }

    console.log(data);
  };
  
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container className='card card-signin flex-row my-5 shadow-lg p-3 mb-5 bg-white rounded text-center'>
          <h1>Add Record </h1>
          <div style={{textAlign:'center'}}>
          <Alert
            show={openErrorAlert}
            color='danger'
            className='mt-3 ml-3 w-100'
            // toggle={onDismiss}
            >
            Failed to add record. Please try later.
          </Alert>
          <Alert
            show={openSuccessAlert}
            color='success'
            className='mt-3 w-100'
            // toggle={onDismiss}
            >
           Record added successfully.
          </Alert>
          <Row>
            <Col sm={{ size: 'auto', offset: 1 }} className='mt-3'>
              <TimePicker
                renderInput={(props) => <TextField {...props} />}
                label='Start Time'
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
              />
            </Col>
            <Col sm={{ size: 'auto', offset: 1 }} className='mt-3'>
              <TimePicker
                renderInput={(props) => <TextField {...props} />}
                label='End Time'
                value={endTime}
                onChange={(newValue) => {
                  setEndTime(newValue);
                }}
              />
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col sm={{ size: 'auto', offset: 1 }} className='mt-3'>
              <DatePicker
                label='Working Day Date'
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={params?.inputProps?.placeholder}
                  />
                )}
              />
            </Col>
            <Col sm={{ size: 'auto', offset: 1 }} className='mt-3'>
              <TextField
                id='outlined-number'
                label='Amount'
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleAmount}
                style={{width:'260px'}}
              />
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col sm={{ size: 'auto', offset: 1 }} className='mt-3'>
              <TextField
                id='filled-helperText'
                label='Work Description'
                defaultValue=' '
                onChange={handleDescription}
                style={{width:'620px'}}
              />
            </Col>
           
          </Row>

          <Row>
          <Col sm={{ size: 'auto', offset: 1 }} className='mt-3'>
              <Button variant='contained' onClick={handleSubmit}>
                Add Record
              </Button>
            </Col>
          </Row>
          </div>
        </Container>
      </LocalizationProvider>
    </>
  );
}

export default AddRecord;

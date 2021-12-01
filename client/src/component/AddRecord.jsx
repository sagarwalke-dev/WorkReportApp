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
    new Date("2014-08-18T21:11:54")
  );
  const [endTime, setEndTime] = React.useState(new Date("2014-08-18T21:11:54"));
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [amount, setAmount] = React.useState("0");
  const [description, setDescription] = React.useState(" ");
  const [openAlert, setOpenAlert] = React.useState(false);
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
    setOpenAlert(true);
    let response = await axios.post(
      "https://workreport-v1.herokuapp.com/api/record/addRecord",
      // "http://localhost:5000/api/record/addRecord",
      data
    );

    if (response) {
      console.log(response.data);
    } else {
      console.log(response);
    }

    console.log(data);
  };
  let onDismiss = () => {
    setOpenAlert(false);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container className='card card-signin flex-row my-5 shadow-lg p-3 mb-5 bg-white rounded text-center'>
          <h1>Add Record </h1>
          <Alert
            show={openAlert}
            variant='danger'
            className='mt-3 ml-3 w-25'
            toggle={onDismiss}
            fade={true}>
            Error
          </Alert>

          <Row>
            <Col md={3} className='mt-3'>
              <TimePicker
                renderInput={(props) => <TextField {...props} />}
                label='Start Time'
                value={startTime}
                onChange={(newValue) => {
                  setStartTime(newValue);
                }}
              />
            </Col>
            <Col md={3} className='mt-3'>
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
            <Col md={3} className='mt-3'>
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
            <Col md={3} className='mt-3'>
              <TextField
                id='outlined-number'
                label='Number'
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleAmount}
              />
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col md={3} className='mt-3'>
              <TextField
                id='filled-helperText'
                label='Work Description'
                defaultValue=' '
                onChange={handleDescription}
              />
            </Col>
            <Col md={3} className='mt-3'>
              <Button variant='contained' onClick={handleSubmit}>
                Add Record
              </Button>
            </Col>
          </Row>
        </Container>
      </LocalizationProvider>
    </>
  );
}

export default AddRecord;

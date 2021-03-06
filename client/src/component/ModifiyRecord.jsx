import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Card, TextField } from "@mui/material";
import TimePicker from "@mui/lab/TimePicker";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Grid from "@mui/material/Grid";
import { Col, Form, FormGroup, Label, Input, FormText, Row } from "reactstrap";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { Link,useHistory } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import e from "cors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ModifiyRecord() {
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [date, setDate] = React.useState(new Date());
  const [amount, setAmount] = React.useState();
  let [recordID,setRecordId]=React.useState("");
  const [description, setDescription] = React.useState(" ");
  const [openErrorAlert, setErrorAlert] = React.useState(false);
  let [errorAlertMessage,setErrorAlertMessage]=React.useState("");
  let [successAlertMessage,setSuccessAlertMessage]=React.useState("");
  
  const [openSuccessAlert, setSuccessAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  let [disableAll,setDisableAll]=useState(false);
  let history=useHistory();
  useEffect(()=>{
    // console.log(this.props.match.params.id);
    validateRecord(window.location.pathname.split("/").pop());

  },[])

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = async() => {
    //call axios for delete record
    // let url="http://localhost:5000/api/record/deleteById"
    let url = "https://workreport-v1.herokuapp.com/api/record/deleteById";

    let data={
      "id":recordID
    }
    let res=await axios.post(url,data);
    console.log("After delete :" +res);
    setOpen(false); 
    setSuccessAlertMessage("Record deleted successfully.");
    setSuccessAlert(true);
    setTimeout(()=>{
      setSuccessAlert(false);
      history.push("/viewAll");
    },2000)
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDelete=(e)=>{
    e.preventDefault();
    setOpen(true);
  }
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
      if (response.data.status == 201) {
        setErrorAlert(false);
        setSuccessAlert(true);
        setTimeout(() => {
          setSuccessAlert(false);
        }, 5000);
      } else {
        setSuccessAlert(false);
        setErrorAlert(true);
      }
    } else {
      console.log(response);
    }

    console.log(data);
  };

  //validate input
  let validateRecord=async(id)=>{
    let url="https://workreport-v1.herokuapp.com/api/record/validateRecord";
    let data={"id":id};
    let res=await axios.post(url,data);
    console.log(res.data);
    if(res.data.status==200){
      if(res.data.isValid){
        console.log(res.data.isValid)
        setDisableAll(false);
        setRecordId(res.data.data._id);
        setAmount(res.data.data.amount)
        getRecord(id);
      }
      else{
        setDisableAll(true);
        setErrorAlertMessage("Invalid Record ID");
        setErrorAlert(true);
      }
    }else{
      setErrorAlertMessage("Someting wrong. Please try later");
      setErrorAlert(true);
      console.log("someting went wrong.\n please try later.");
    }
  }

  //get data
  let getRecord=async(id)=>{
    let url="http://localhost:5000/api/record/getRecordByID";
    let data={"id":id};
    let res=await axios.post(url,data);
    if(res.data.status==200){
      setDate(res.data.data.date);
    }

  }
  return (
    <>

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
         Are you sure ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete <b> { recordID.substr(recordID.length - 5)}</b> record.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>


      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container className='card card-signin flex-row my-5 shadow-lg p-3 mb-5 bg-white rounded text-center'>
          <h1>Modifiy Record </h1>
          <div style={{ textAlign: "center" }}>
            <Alert
              show={openErrorAlert}
              color='danger'
              className='mt-3 ml-3'
              // toggle={onDismiss}
            >
             {errorAlertMessage}
            </Alert>
            <Alert
              show={openSuccessAlert}
              color='success'
              className='mt-3'
              // toggle={onDismiss}
            >
             {successAlertMessage}
            </Alert>
            <Row>
              <Col sm={{ size: "auto", offset: 1 }} className='mt-3'>
                <TimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label='Start Time'
                  value={startTime}
                  disabled={disableAll}
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                />
              </Col>
              <Col sm={{ size: "auto", offset: 1 }} className='mt-3'>
                <TimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label='End Time'
                  value={endTime}
                  disabled={disableAll}
                  onChange={(newValue) => {
                    setEndTime(newValue);
                  }}
                />
              </Col>
            </Row>

            <Row className='mt-3'>
              <Col sm={{ size: "auto", offset: 1 }} className='mt-3'>
                <DatePicker
                  label='Working Day Date'
                  value={date}
                  disabled={disableAll}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText=""
                    />
                  )}
                />
              </Col>
              <Col sm={{ size: "auto", offset: 1 }} className='mt-3'>
                <TextField
                  id='outlined-number'
                  label='Amount'
                  type='number'
                  value={amount}
                  disabled={disableAll}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleAmount}
                  // style={{ width: "260px" }}
                />
              </Col>
            </Row>

            {/* <Row className='mt-3'>
              <Col sm={{ size: "auto", offset: 1 }} className='mt-3'>
                <TextField
                  id='filled-helperText'
                  label='Work Description'
                  defaultValue=' '
                  onChange={handleDescription}
                  // style={{ width: "620px" }}
                />
              </Col>
            </Row> */}

            <Row>
              <Col sm={{ size: "auto", offset: 1 }} className='mt-3'>
                <Button variant='contained'  disabled={true} onClick={handleSubmit}>
                  Update Record
                </Button>
              </Col>

              <Col sm={{ size: "auto", offset: 1 }} className='mt-3'>
                <Button variant='contained'  disabled={disableAll} onClick={handleDelete}>
                  Delete Record
                </Button>
              </Col>

              <Col sm={{ size: "auto", offset: 1 }} className='mt-3'>
                <Button variant='contained'  component={Link} to="/viewAll"            style={{ textDecoration: 'none', color:'white' }}
>
                  Cancle
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </LocalizationProvider>
    </>
  );
}

export default ModifiyRecord;

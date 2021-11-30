import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Card, TextField } from "@mui/material";
import TimePicker from "@mui/lab/TimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

function AddRecord() {
  const [startTime, setStartTime] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [endTime, setEndTime] = React.useState(new Date("2014-08-18T21:11:54"));
  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };
  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(startTime);
    console.log(endTime);
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Card variant='outlined'>
          <Box
            sx={{
              height: "100vh",
              textAlign: "center",
            }}>
            <h1>Add Record</h1>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label='Start Time'
                value={startTime}
                onChange={handleStartTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />

              <TimePicker
                label='End Time'
                value={endTime}
                onChange={handleEndTimeChange}
                renderInput={(params) => <TextField {...params} />}
              />

              <Button variant='contained' onClick={handleSubmit}>
                Submit
              </Button>
            </LocalizationProvider>
          </Box>
        </Card>
      </Container>
    </>
  );
}

export default AddRecord;

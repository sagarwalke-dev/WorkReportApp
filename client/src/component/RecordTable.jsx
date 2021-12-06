import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableHead,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import * as React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Col, Row } from "reactstrap";
let tableData = [];
// let rows = [];

function TablePaginationActions(props) {
  const theme = useTheme();

  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'>
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'>
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'>
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'>
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(date, startTime, endTime, amount, totalTime, totalAmount) {
  return { date, startTime, endTime, amount, totalTime, totalAmount };
}

// let rows = [];

export default function RecordTable(prpos) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const head = [
    "Date",
    "Start Time",
    "End Time",
    "Amount",
    "Total Time (minutes)",
    "Total Amount",
  ];
  let [rows, setRows] = React.useState([]);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  let [monthNumber, setMonthNumber] = React.useState(new Date().getMonth());
  let [yearNumber, setYearNumber] = React.useState(new Date().getFullYear());
  let [response, setReponse] = React.useState([]);
  let [totalHours, setTotalHours] = React.useState(0);
  let [amount, setAmount] = React.useState(0);
  let [totalPaid, setTotalPaid] = React.useState(0);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();
  let years = [date.getFullYear()];

  for (let i = 1; i <= 5; i++) {
    years[i] = date.getFullYear() - i;
  }

  React.useEffect(() => {
    console.log("passing props to getTableData in RecordTable.jsx");
    getTableData();
  }, []);

  React.useEffect(() => {
    getTableData();
  }, [monthNumber, yearNumber]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTableData = async () => {
    let data = {
      month: monthNumber + 1,
      year: yearNumber,
    };

    // console.log("getting data");
    let url = "https://workreport-v1.herokuapp.com/api/record/getAll";
    // let url = "http://localhost:5000/api/record/getByMonthAndYear";
    let response = await axios.post(url, data);
    let rowsData = [];
    console.log(response.data.status);
    if (response.data.status == 200) {
      tableData = response.data.data;
      console.log("TD" + tableData);
      tableData.map((data, index) => {
        rowsData[index] = createData(
          data.date,
          data.startTime,
          data.endTime,
          data.amount,
          data.totalHours,
          data.totalAmount
        );
      });
      setRows(rowsData);
    }
    //get monthly calculation
    getTotalCalculation();

    // console.log(tableData);
  };

  const getTotalCalculation = async () => {
    let data = {
      month: monthNumber + 1,
      year: yearNumber,
    };
    let url =
      "https://workreport-v1.herokuapp.com/api/record/getMonthlyCalculation";
    let response = await axios.post(url, data);
    if (response.data.status == 200) {
      setTotalHours(response.data.data[0].totalHours / 60);
      setAmount(response.data.data[0].amount);
      setTotalPaid(response.data.data[0].totalPaid);
    } else {
      setTotalHours(0);
      setAmount(0);
      setTotalPaid(0);
    }
  };
  return (
    <Container className='card card-signin flex-row my-5 shadow-lg p-3 mb-5 bg-white rounded text-center'>
      <div style={{ textAlign: "center" }}>
        <h1>Monthly Report</h1>
        <hr />
        <FormControl sx={{ m: 1, minWidth: 190 }}>
          <InputLabel id='month'>Month</InputLabel>
          <Select
            labelId='month'
            id='month'
            label='Month'
            value={monthNumber}
            onChange={(e) => {
              setMonthNumber(e.target.value);
              // getTableData();
            }}>
            {months.map((month, index) => (
              <MenuItem value={index}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 190 }}>
          <InputLabel id='year'>Year</InputLabel>
          <Select
            labelId='year'
            id='year'
            label='year'
            value={yearNumber}
            onChange={(e) => {
              setYearNumber(e.target.value);
              // getTableData();
            }}>
            {years.map((year) => (
              <MenuItem value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <Button
          variant='outlined'
          className='mt-3 ml-3'
          startIcon={<SearchIcon />}
          // onClick={getTableData()}
        >
          Search
        </Button> */}

        <Row>
          <Col style={{ fontWeight: "500" }}>Total Hours: {totalHours}</Col>

          <Col style={{ fontWeight: "500" }}> Amount: {amount}</Col>

          <Col style={{ fontWeight: "500" }}> Total Paid: {totalPaid}</Col>
        </Row>
      </div>
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
          <TableHead>
            <TableRow>
              {head.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.date}>
                <TableCell component='th' scope='row'>
                  {row.date}
                </TableCell>
                <TableCell style={{ width: 160 }} align='left'>
                  {row.startTime}
                </TableCell>
                <TableCell style={{ width: 160 }} align='left'>
                  {row.endTime}
                </TableCell>
                <TableCell style={{ width: 160 }} align='left'>
                  {row.amount}
                </TableCell>
                <TableCell style={{ width: 160 }} align='left'>
                  {row.totalTime}
                </TableCell>
                <TableCell style={{ width: 160 }} align='left'>
                  {row.totalAmount}
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {/* <TableFooter style={{ textAlign: "center" }}>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[{ label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter> */}
        </Table>
      </TableContainer>
    </Container>
  );
}

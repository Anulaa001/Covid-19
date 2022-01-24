import React from "react";
import numeral from "numeral";
import { TableContainer, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  Table,
  Paper,
  Container} from "@mui/material";

function CasesTable({ countries }) {

    return (
    <Container>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="cases table">
      <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {countries.map((country) => (
          <TableRow>
            <TableCell>{country.country}</TableCell>
            <TableCell>{numeral(country.cases).format("0,0")}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

export default CasesTable;

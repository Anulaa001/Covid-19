import React, { useState, useEffect } from "react";
import { 
    MenuItem,
    FormControl,
    Select,
    Container,
    Paper,
    Accordion,
    AccordionDetails,
    AccordionSummary} from "@mui/material";
import {ExpandMore} from "@mui/icons-material"
import numeral from "numeral";

import CasesCard from "../components/CasesCard";
import CasesGraph from "../components/CasesGraph";
import CasesTable from "../components/CasesTable";
import { sortData, formatValues } from "../components/helper";

function Home() {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  const countryName = (country) => {
    return country.charAt(0).toUpperCase() + country.slice(1);
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          let sortedData = sortData(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : "https://disease.sh/v3/covid-19/countries/poland";
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
      });
  };
  return (
    <Container>
      <Container component={Paper} style={{ display: "flex", marginBottom:'20px'}}>
        <h1 style={{ flex: 1 }}>Statystics</h1>
        <FormControl style={{ alignSelf: "center" }}>
          <Select value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="poland">Poland</MenuItem>
          </Select>
        </FormControl>
      </Container>
      <Container component={Paper} style={{ display: "flex" }}>
        <CasesCard
          onClick={(e) => setCasesType("cases")}
          title="Coronavirus Cases"
          isRed
          active={casesType === "cases"}
          cases={formatValues(countryInfo.todayCases)}
          total={numeral(countryInfo.cases).format("0.0a")}
        />
        <CasesCard
          onClick={(e) => setCasesType("recovered")}
          title="Recovered"
          active={casesType === "recovered"}
          cases={formatValues(countryInfo.todayRecovered)}
          total={numeral(countryInfo.recovered).format("0.0a")}
        />
        <CasesCard
          onClick={(e) => setCasesType("deaths")}
          title="Deaths"
          isRed
          active={casesType === "deaths"}
          cases={formatValues(countryInfo.todayDeaths)}
          total={numeral(countryInfo.deaths).format("0.0a")}
        />
      </Container>
      {casesType !== "recovered" && (
        <Container component={Paper} style={{ marginBottom:'20px'}}>
          <h3>
            {countryName(country)} new {casesType}
          </h3>
          <CasesGraph casesType={casesType} country={country} />
        </Container>
      )}
      {country === "worldwide" && (
        <Container component={Paper} style={{marginBottom:'20px'}}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <h3>Live Cases by Country</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <CasesTable countries={tableData} />
                </AccordionDetails>
            </Accordion>
        </Container>
      )}
    </Container>
  );
}

export default Home;

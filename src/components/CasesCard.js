import React from "react";
import { CardActionArea, CardContent, Typography } from "@mui/material";
import styled from "styled-components";


function CasesCard({ title, cases, total, active, isRed, ...props }) {
  return (
    <StyledCard>
    <CardActionArea
      onClick={props.onClick}
      className={`casesCard ${active && "casesCard--selected"} ${
        isRed && "casesCard--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`casesCard__cases ${!isRed && "casesCard__cases--green"}`}>
          {cases}
        </h2>

        <Typography color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </CardActionArea>
    </StyledCard>
  );
}

const StyledCard = styled.div `
.casesCard:not(:last-child) {
  margin-right: 10px;
}

.casesCard--selected {
  border-top: 10px solid greenyellow;
  border-radius: 0.5;
}

.casesCard--red {
  border-color: #f48fb1;
}

.casesCard__cases--green {
  color: lightgreen !important;
}

.casesCard__cases {
  color: #f48fb1;
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.casesCard__total {
  color: #6c757d;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  margin-top: 15px !important;
}`

export default CasesCard;
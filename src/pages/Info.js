import React from 'react'
import {Container,
    Paper,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography} from '@mui/material'

function Info() {
    return (
        <Container component={Paper}  style={{paddingBottom:'20px'}}>
            <h1>Info</h1>
            <Card>
            <React.Fragment>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    image="./covid.jpeg"
                    alt="covid-19"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Coronavirus
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    "Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.
                    Most people infected with the virus will experience mild to moderate respiratory illness 
                    and recover without requiring special treatment. 
                    However, some will become seriously ill and require medical attention. 
                    Older people and those with underlying medical conditions like 
                    cardiovascular disease, diabetes, chronic respiratory disease, 
                    or cancer are more likely to develop serious illness. 
                    Anyone can get sick with COVID-19 and become seriously ill or die at any age.."
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </React.Fragment>
            </Card>
        </Container>
    )
}

export default Info

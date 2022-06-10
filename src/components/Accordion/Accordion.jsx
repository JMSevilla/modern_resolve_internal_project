import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';

const AppAccordion = ({array}) => {
    return(
        <React.Fragment>
            {
                array.map((item) => {
                    return(
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography>{item.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    {
                                        item.details && item.details.map((i) => {
                                            return(
                                                <React.Fragment>
                                                    <center>
                                                    {i.imageDrop}
                                                    </center>
                                                    {i.content}
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
        </React.Fragment>
    )
}

export default AppAccordion
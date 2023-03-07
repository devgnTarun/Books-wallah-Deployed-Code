import React from 'react'
import {Step, StepLabel, Stepper} from '@material-ui/core'

const CheckOurSteps = ({activeStep}) => {
    const steps = [
        {
            label : <p>Shipping Details</p>,
            icons : <i class="fas fa-shipping-fast"></i>,
        },
        {
            label : <p>Confirm Order </p>, 
            icons : <i class="fas fa-check-circle"></i>,

        },
        {
            label : <p>Payement</p>,
            icons : <i class="fas fa-handshake"></i>,
        },
    ]

    const stepStyle = {
        boxSizing : 'border-box',
        marginTop : '150px',
        width :'90%',
    }

  return (
     // CSS OF THIS IS WRITTEN IN Shipping.CSS
   <>
    <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((i, index) => 
            <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index  ? true : false}>
                <StepLabel icon={i.icons} style={{color : activeStep >= index ? 'rgb(255, 89, 0)' : "rgba(255, 174, 0, 0.712)"}}>
                        {i.label}
                </StepLabel> 
            </Step>
        )}
    </Stepper>
   </>
  )
}

export default CheckOurSteps
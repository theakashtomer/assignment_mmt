import React from 'react'
import { useSelector } from 'react-redux'
import Step1 from './Step1';
import Step2 from "./Step2"
import Step3 from "./Step3"

export default function Stepper() {

    const {step} = useSelector((state) => state.form);

    const form =[
        {
            name:"Personal Information",
            component : ()=><Step1/>
        },
        {
            name:"Company Information",
            component : ()=><Step2/>
        },
        {
            name:"Plan Selection",
            component : ()=><Step3/>
        }
    ]

    const ActiveComponent=form[step-1]?.component

    return (
    <>
    
    <h2 className='my-3'>Stepper Form</h2>

    <div className='stepper my-4'>
        {form.map((item,index)=>{
            return (
                <div key={item.name} className={`step ${ step>index+1? "complete":""} ${step===index+1? "active":""}`}>
                    <div  className='step-number'>{step>index+1? (<span>&#10003;</span>):(index+1)}</div>
                    <div  className='step-name'>{item.name}</div>
                </div>
            )
        }
    )}
    </div>

    <ActiveComponent/>
    </>
  )
}

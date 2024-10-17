import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { savePersonalInfo, nextStep } from '../redux/features/formSlice';
import * as Yup from "yup"

export default function Step1() {

    const dispatch = useDispatch();
    const personalInfo = useSelector((state) => state.form.personalInfo);
    const [formValues, setFormValues] = useState(personalInfo);
    const[errors,setErrors]=useState({})

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };

    const validationSchema=Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid Email Format").required("Email is required"),
      companyName: Yup.string().required("Company Name is required"),
      companyWebsite: Yup.string().url("Invalid website URL format").required("Company Website is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.number().typeError("zip code must be a number").required("Zip Code is required"),
    })

    const validateForm=async()=>{
      try {
        await validationSchema.validate(formValues, {abortEarly: false}); 
        return true;
      } catch (error) {
        const errObj={}
        error.inner.forEach(err=>{
          errObj[err.path]=err.message;
        });
        setErrors(errObj)
        return false;
      }
    }

    const handleNext = async () => {
      const isValid = await validateForm()
      if(isValid){
        dispatch(savePersonalInfo(formValues));
        dispatch(nextStep());
      }
    };

  return (
    <div className='step'>
      {
        Object.keys(formValues).map(keys=>(
          <div key={keys} className='mb-1'>
          <input key={keys} name={keys} className="form-control" value={formValues[keys]} onChange={handleChange} placeholder={keys}/>
          {errors[keys] && <div className="text-danger">{errors[keys]}</div>}
          </div>
        ))
      }
      <button className='my-3 btn btn-primary' onClick={handleNext}>Next</button>
    </div>
  )
}

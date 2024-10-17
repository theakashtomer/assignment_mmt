import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { saveCompanyInfo, nextStep, prevStep } from '../redux/features/formSlice';

export default function Step2() {
  
    const dispatch = useDispatch();
    const companyInfo = useSelector((state) => state.form.companyInfo);
    const [formValues, setFormValues] = useState(companyInfo);

    const fieldsOptions = ['Banking', 'Shopping', 'Technology', 'Healthcare'];

    const handleCheckboxChange = (event) => {
      const { value } = event.target;
      const newFields = formValues.fields.includes(value)
        ? formValues.fields.filter((field) => field !== value)
        : [...formValues.fields, value];
      setFormValues({ ...formValues, fields: newFields });
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleNext = () => {
      dispatch(saveCompanyInfo(formValues));
      dispatch(nextStep());
    };

  return (
        <>
          <div className='my-3'>
            <label className="input-group-text">Your company is working on which field:</label>
            {fieldsOptions.map((option) => (
              <div key={option} className="form-check">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="fields"
                    value={option}
                    checked={formValues.fields.includes(option)}
                    onChange={handleCheckboxChange}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
    
          <div className="input-group mb-3">
          <label className="input-group-text">How many employees are in your company?</label>
            <select className="form-select" name="employees" value={formValues.employees} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1-10">1-10</option>
              <option value="10-20">10-20</option>
              <option value="20-30">20-30</option>
              <option value="40+">40+</option>
            </select>
          </div>
    
          <div className='input-group'>
            <label>Does the company have a WFH policy?</label>
              <div className="form-check">
                <label className='form-check-label mx-3'>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="wfhPolicy"
                    value="Yes"
                    checked={formValues.wfhPolicy === 'Yes'}
                    onChange={handleChange}
                    />
                  Yes
                </label>
                <label className='form-check-label mx-4'>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="wfhPolicy"
                    value="No"
                    checked={formValues.wfhPolicy === 'No'}
                    onChange={handleChange}
                    />
                  No
                </label>
              </div>
          </div>
    
          <div>
            <button className='my-3 btn btn-primary mx-3' onClick={() => dispatch(prevStep())}>Previous</button>
            <button className='my-3 btn btn-primary' onClick={handleNext}>Next</button>
          </div>
        </>
      );
}

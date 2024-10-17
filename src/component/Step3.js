import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePlanSelection, prevStep } from '../redux/features/formSlice';
import { useNavigate } from 'react-router-dom';

export default function Step3 () {
  const dispatch = useDispatch();
  const planSelection = useSelector((state) => state.form.planSelection);
  const [formValues, setFormValues] = useState(planSelection);
  const [finalPrice, setFinalPrice] = useState(0);
  const navigate=useNavigate()

  const plans = {
    monthly: { gold: 10, titanium: 20 },
    yearly: { gold: 100, titanium: 200 },
  };

  useEffect(() => {
    if (formValues.planType && formValues.planDuration && formValues.numberOfUsers) {
      const planPrice = plans[formValues.planDuration][formValues.planType];
      setFinalPrice(planPrice * formValues.numberOfUsers);
    }
  }, [formValues.planType, formValues.planDuration, formValues.numberOfUsers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (e) => {
    setFormValues({ ...formValues, planDate: e.target.value });
  };

  const handleNext = () => {
    const updatedFormValues = { ...formValues, price: finalPrice };
    dispatch(savePlanSelection(updatedFormValues));
    navigate("/details")
  };

  return (
    <>

      <div className="input-group mb-3">
        <label className='input-group-text'>Start Plan Date:</label>
        <input
          type="date"
          className="form-control"
          name="planDate"
          value={formValues.planDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="input-group mb-3">
        <label className='input-group-text'>Select Plan Duration:</label>
        <label className="form-control">
          <input
            type="radio"
            name="planDuration"
            value="monthly"
            checked={formValues.planDuration === 'monthly'}
            onChange={handleChange}
          />
          Monthly
        </label>
        <label className="form-control">
          <input
            type="radio"
            name="planDuration"
            value="yearly"
            checked={formValues.planDuration === 'yearly'}
            onChange={handleChange}
          />
          Yearly
        </label>
      </div>

      <div className="input-group mb-3">
        <label className='input-group-text'>Select Plan Type:</label>
        <label className="form-control">
          <input
            type="radio"
            name="planType"
            value="gold"
            checked={formValues.planType === 'gold'}
            onChange={handleChange}
          />
          Gold (${formValues.planDuration === 'yearly' ? plans.yearly.gold : plans.monthly.gold})
        </label>
        <label className="form-control">
          <input
            type="radio"
            name="planType"
            value="titanium"
            checked={formValues.planType === 'titanium'}
            onChange={handleChange}
          />
          Titanium (${formValues.planDuration === 'yearly' ? plans.yearly.titanium : plans.monthly.titanium})
        </label>
      </div>

      <div className="input-group mb-3">
        <label className='input-group-text'>Number of Users:</label>
        <input
          type="number"
          name="numberOfUsers"
          className="form-control"
          value={formValues.numberOfUsers}
          min="1"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3 my-3">
        <h6>Order Summary:</h6>
        <div>Selected Plan: {formValues.planType} ({formValues.planDuration})</div>
        <div>Number of Users: {formValues.numberOfUsers}</div>
        <div>Total Price: ${finalPrice}</div>
      </div>

      <div>
        <button className='my-3 btn btn-primary mx-3' onClick={() => dispatch(prevStep())}>Previous</button>
        <button className='my-3 btn btn-primary' onClick={handleNext}>Submit</button>
      </div>
    </>
  );
};


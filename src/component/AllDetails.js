import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetForm } from '../redux/features/formSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function AllDetails() {

    const formData = useSelector((state) => state.form);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const InfoCard = ({ title, data }) => (
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {data && Object.keys(data).map(key => (
            <div className="input-group mb-3" key={key}>
              <div className="card-text">{key}</div>
              <div className="card-text mx-2">- {data[key]}</div>
            </div>
          ))}
        </div>
      </div>
    );

    const handleSubmit = () => {
      dispatch(resetForm());
      navigate("/");
  };

    return (
    <>
      <h2 className="my-3">All Details</h2>
      <div className='details-wrapper'>
        {formData && Object.keys(formData).filter(key => key !== 'step').map((key) => (
          <InfoCard key={key} title={key.at(0).toUpperCase().concat(key.slice(1))} data={formData[key]} />
        ))}
      </div>
      <button className='btn btn-primary mx-3'><Link className='link' to="/">Edit</Link></button>
      <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
    </>
  )
}

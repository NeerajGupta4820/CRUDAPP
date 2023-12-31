import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Addstud() {
    const navigate = useNavigate();
    const [inputdata,setInputdata]=useState({
        "name":"",
        "email":"",
        "address":"",
        "age":"",
        "profilePic":""
    })
    
    //onchange function
    const setstud=(e)=>{
        console.log(e.target.value);
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });   
    }

    const imageUpload=(event)=>{
        setInputdata({...inputdata,profilePic:event.target.files[0]})
    }

    //onclick event
    const addinpdata = async (e) => {
        e.preventDefault();

        const { name,email, address , age } = inputdata;
        console.log("==",inputdata.profilePic,"===",inputdata.profilePic.name)
        const formdata=new FormData();
        formdata.append('myFile',inputdata.profilePic,inputdata.profilePic.name)
        formdata.append('name',inputdata.name)
        formdata.append('email',inputdata.email)
        formdata.append('address',inputdata.address)
        formdata.append('age',inputdata.age)

        const res = await axios.post("http://localhost:5000/addstud",formdata)
        const data =  res.data;
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            toast.error("not upload");

        } 
        else {
            setInputdata(data);
            toast.success('Please wait  !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
                });
            setTimeout(() => {
                navigate('/allstud');
              }, 3000);

        }
    }

    
    return (
        <div className='container mt-5'>
            <h4>All New Student Information</h4>
            <div className='underline1'></div>
            <form className='mt-5 shadow p-5 w-75' encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Name" 
                    onChange={setstud} name="name" value={inputdata.name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Profile Image</label>
                    <input type="file" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Profile image" 
                    onChange={imageUpload} name="myFile" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Email</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter Student Email"
                    onChange={setstud} name="email" value={inputdata.email}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Address</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Address" 
                    onChange={setstud} name="address" value={inputdata.address}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student age</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Contact Number"
                    onChange={setstud} name="age" value={inputdata.age}/>
                </div>
                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={addinpdata}>Add Student</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/allstud">Back to Home</NavLink>
                </div>
              

            </form>
        </div>
    )
}

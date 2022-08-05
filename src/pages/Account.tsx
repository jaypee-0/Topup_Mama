import React from 'react';
import timezones from '../data/timezones.json'
import avatar from '../assets/images/profilepicture.jpg'
import { Authcontext } from '../context/Authcontext';

const Account = () => {
  let {handleRegister, errorreg} = React.useContext(Authcontext)
  const [file, setFile] = React.useState();

  function handleChange(e: React.FormEvent) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  function uploadphoto() {
    document.getElementById('fileupload').click()
  }
  const datetime = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <div id="setting" className='py-3 px-md-3'>
      <h2 className='mb-2'>Register as a new user</h2>
      <form className='d-flex col-md-8 flex-column' onSubmit={handleRegister}>
        <div className='d-flex flex-column flex-md-row mb-md-4'>
          <div className='col-md-4 align-items-center d-md-flex mh-100 '>
            <p>
              Profile Image
            </p>
            </div>
          <div className='col-md-8'>
            <div className="d-flex flex-column flex-md-row">
              <img src={file ? file : avatar} className="" alt="" />
              
              <button  onClick={uploadphoto.bind()} className='border px-3 py-2 ms-auto my-auto'>Upload Photo</button>
              <input id='fileupload' style={{display: 'none '}} type="file" onChange={handleChange} accept="image/*" className='mt-2 w-auto mt-md-auto form-control align-self-start ms-auto upload py-2' />
            </div>
          </div>
        </div>
        <div className='d-flex flex-column flex-md-row mb-md-4'>
          <p className='col-md-4'>First Name</p>
          <div className='col-md-8'><input name='name' className='w-100 p-2' type="text" placeholder='Jay' required />
          {errorreg && <p className="tiro mb-0 fs-6x text-danger">{errorreg}</p>}</div>
        </div>
        <div className='d-flex flex-column flex-md-row mb-md-4'>
          <p className='col-md-4'>Last Name</p>
          <div className='col-md-8'><input className='w-100 p-2' type="text" placeholder='pee' /></div>
        </div>
        <div className='d-flex flex-column flex-md-row mb-md-4'>
          <p className='col-md-4'>Phone Number</p>
          <div className='col-md-8'><input className='w-100 p-2' type="phone" placeholder='+234 000 0000 000' name="phoneNumber" required />
          {errorreg && <p className="tiro mb-0 fs-6x text-danger">{errorreg}</p>}</div>
        </div>
        <div className='d-flex flex-column flex-md-row mb-md-4'>
          <p className='col-md-4'>Email Address</p>
          <div className='col-md-8'><input className='w-100 p-2' type="email" placeholder='Jaypee@gmail.com' name='email' required  />
          {errorreg && <p className="tiro mb-0 fs-6x text-danger">{errorreg}</p>}</div>
        </div>
        <div className='d-flex flex-column flex-md-row mb-md-4'>
          <p className='col-md-4'>Timezone</p>
          <select name="" className="w-100">
            <option>{datetime}</option>
            {timezones.map((data) => {
                    return <option key={data}>{data}</option>;
                  })}
          </select>
        </div>
        <div className='d-flex flex-column flex-md-row mb-md-4'>
        <div className='col-md-4 fs-5 fw-bold d-none d-md-block'></div>
        <div className='col-md-8'>
          <button type='submit' className='py-2 rounded hover-shadow border px-3'>Save Settings</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default Account;

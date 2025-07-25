import './userDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { updateUser } from '../../Services/ApiClient'

export default function UserDetails({ user, setUser }) {

  const [edit, setEdit] = useState(false);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);


  useEffect(() => {
    setCity(user.city);
    setCountry(user.country);
  }, [user]);

  function handleSubmit(event) {
    setEdit(!edit);
    event.preventDefault();
  }

  async function handleSave(event) {
    event.preventDefault();
    const updatedUser = await updateUser(user._id, city, country);
    setUser(updatedUser);
    setEdit(!edit);
  }

  function handleNewCity(event) {
    const newCity = event.target.value;
    setCity(newCity);
  }

  function handleNewCountry(event) {
    const newCountry = event.target.value;
    setCountry(newCountry);
  }

  return (
    <>
      {
        !edit ? (
          <div className='profile-container'>
            <h1>My profile</h1>
            <div className='img-block'>
              <FontAwesomeIcon icon={faCamera} className='camera-icon' />
              <img src="/avatar.jpg" alt="" width={120} />
            </div>
            <p>Username</p>
            <p>{user.username}</p>
            <p>Email</p>
            <p>{user.email}</p>
            <p>City</p>
            <p>{city}</p>
            <p>Country</p>
            <p>{country}</p>
            <button type="submit" onClick={handleSubmit}>Edit profile</button>
          </div>
        ) : (
          <div className='profile-container'>
            <h1>Edit my profile</h1>
            <div className='img-block'>
              <FontAwesomeIcon icon={faCamera} className='camera-icon' />
              <img src="/avatar.jpg" alt="" width={120} />
            </div>
            <p>Username</p>
            <input type="text" id="username" value={user.username} disabled={true} readOnly />
            <p>Email</p>
            <input type="text" id="email" value={user.email} disabled={true} readOnly />
            <p>City</p>
            <input type="text" id="city" value={city} onChange={handleNewCity} />
            <p>Country</p>
            <input type="text" id="country" value={country} onChange={handleNewCountry} />
            <button type="submit" onClick={handleSave}>Save</button>
          </div>
        )
      }
    </>
  )
}
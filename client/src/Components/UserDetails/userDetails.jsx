import './userDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { updateUser } from '../../Services/ApiClient'
import { Link } from 'react-router'

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
      <div className="go-back">
        <Link to={"/"}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h4>Profile</h4>
      </div>
      {
        !edit ? (
          <div className='profile-container'>
            <div className='img-block'>
              <FontAwesomeIcon icon={faCamera} className='camera-icon' />
              <img src="/avatar.jpg" alt="" width={120} />
              <h2>{user.name}</h2>
              <p className='label'>{user.username}</p>
            </div>
            <div className='details-block'>
              <p className='label'>Email</p>
              <p className='value'>{user.email}</p>
              <p className='label'>City</p>
              <p className='value'>{city}</p>
              <p className='label'>Country</p>
              <p className='value'>{country}</p>
            </div>
            <div className='button-container'>
              <button type="submit" onClick={handleSubmit}>Edit profile</button>
            </div>
          </div>
        ) : (
          <div className='profile-container'>
            <div className='img-block'>
              <FontAwesomeIcon icon={faCamera} className='camera-icon' />
              <img src="/avatar.jpg" alt="" width={120} />
              <h2>{user.name}</h2>
              <p className='label'>{user.username}</p>
            </div>
            <div className='details-block'>
              <p className='label'>Email (cannot be changed)</p>
              <input type="text" id="email" value={user.email} disabled={true} readOnly />
              <p className='label'>City</p>
              <input type="text" id="city" value={city} onChange={handleNewCity} />
              <p className='label'>Country</p>
              <input type="text" id="country" value={country} onChange={handleNewCountry} />
            </div>
            <div className='button-container'>
              <button type="submit" onClick={handleSave}>Save</button>
            </div>
          </div>
        )
      }
    </>
  )
}
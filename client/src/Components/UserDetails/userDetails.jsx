import './userDetails.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

export default function UserDetails({ user }) {

  return (
    <>
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
        <p>{user.city}</p>
        <p>Country</p>
        <p>{user.country}</p>
        <button>Edit profile</button>
      </div>
    </>
  )
}
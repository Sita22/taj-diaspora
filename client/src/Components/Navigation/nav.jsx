import { Link } from 'react-router'
import './nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'



export default function Nav({ user }) {
  //TODO display search bar 
  //TODO display user icon with link to User details

  function handleAddPost() {

  }
  return (
    <>
      <nav>
        <div>
          <Link to={"/"}>
            <img src="/logo.png" alt="" width={100} />
          </Link>
        </div>
        <div className='right-nav'>
          <FontAwesomeIcon icon={faSearch} size="lg" />
          <FontAwesomeIcon icon={faPlus} onClick={handleAddPost} size="lg" />
          <Link to={"/user"}>
            <img src="/avatar.jpg" alt="" width={50} />
          </Link>
        </div>
      </nav>

    </>
  )
}
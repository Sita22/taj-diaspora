import { Link } from 'react-router'
import './nav.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Nav() {
  //TODO display search bar 
  
  function handleAddPost() {

  }
  return (
    <>
      <nav>
        <div className='left-nav'>
          <Link to={"/"}>
            <img src="/logoNew.png" alt="" width={150} />
          </Link>
        </div>
        <div className='right-nav'>
          <FontAwesomeIcon icon={faSearch} size="lg" />
          <Link to={"/posts/add"}>
            <FontAwesomeIcon icon={faPlus} onClick={handleAddPost} size="lg" color="#000" />
          </Link>
          <Link to={"/user"}>
            <img src="/avatar.jpg" alt="" width={50} />
          </Link>
        </div>
      </nav>

    </>
  )
}
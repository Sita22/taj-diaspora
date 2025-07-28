import { Link } from 'react-router'
import './nav.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faBars, faHouse, faUser, faArrowRightFromBracket, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function Nav({ posts }) {
  //TODO display search bar 

  const [open, setOpen] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List className='nav-list'>
        <ListItem className='nav-list-item' disablePadding>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHouse} color="#fff" />
            <ListItemText primary={"Home"} />
          </Link>
        </ListItem>
        <ListItem className='nav-list-item' disablePadding>
          <Link to={"/user"}>
            <FontAwesomeIcon icon={faUser} color="#fff" />
            <ListItemText primary={"My profile"} />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List className='nav-list'>
        <ListItem className='nav-list-item' disablePadding>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} color="#fff" />
            <ListItemText primary={"Log out"} />
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  function handleSearch(event) {
    setDisplaySearchBar(true);
    const value = event.target.value.toLowerCase();
    const filteredPosts = Object.values(posts).filter((post) => {
      if (value === "") {
        return "";
      } else {
        const check = post.title.toLowerCase().includes(value);
        console.log(check)
        return check;
      }
    });
    console.log(filteredPosts);
    setSearchList(filteredPosts);
  }

  return (
    <>

      {
        !displaySearchBar ? (
          <nav>
            <div className='left-nav'>
              <Link to={"/"}>
                <img src="/low-qual-logo.png" alt="" width={170} />
              </Link>
            </div>
            <div className='right-nav'>
              <div className='add-post-box'>
                <Link to={"/posts/add"}>
                  <FontAwesomeIcon icon={faPlus} size="lg" color="#fff" />
                </Link>
              </div>
              <div className='search-bar'>
                <FontAwesomeIcon icon={faSearch} size="lg" className='search-icon' color="#69140e" onClick={() => setDisplaySearchBar(true)} />
              </div>
              <div className='drawer'>
                <FontAwesomeIcon icon={faBars} onClick={toggleDrawer(true)} size="lg" color="#69140e" />
                <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer>
              </div>
            </div>
          </nav>
        ) : (
          <div className='search-container'>
            <FontAwesomeIcon icon={faChevronLeft} color="#69140e" className='back-icon' onClick={() => setDisplaySearchBar(false)} />
            <input type="text" placeholder="Search posts..." onChange={handleSearch} />
            {
              searchList.length > 0 && (
                <ul className='search-list'>
                  {searchList.map((searchItem) => {
                    return (
                      <li>
                        <Link to={`/posts/${searchItem._id}`}>
                          {searchItem.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
          </div>
        )
      }
    </>
  )
}
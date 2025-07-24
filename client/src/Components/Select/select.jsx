import communities from '../../mock/communities.json'
import './select.css'

export default function Select({ topics }) {

  //TODO when select specific Topic, display list of the posts belonging to this topic
  //TODO display community of the user

  return (
    <>
      <div className='dropdowns'>
        {/* <form action="">
          <label htmlFor=""></label>
          <select name="" id="">
            {
              communities.map(comm => {
                return <option key={comm._id} value={comm.city}>{comm.city}</option>
              })
            }
          </select>
        </form> */}
        <form action="">
          <label htmlFor=""></label>
          <select name="" id="">
            {
              topics.map(topic => {
                return <option key={topic.title} value={topic.title}>{topic.title}</option>
              })
            }
          </select>
        </form>
      </div>
    </>
  )
}
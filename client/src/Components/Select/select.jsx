import communities from '../../mock/communities.json'
import topics from '../../mock/topics.json'

export default function Select({ }) {
  return (
    <>
      <div className='dropdowns'>
        <form action="">
          <label htmlFor=""></label>
          <select name="" id="">
            {
              communities.map(comm => {
                return <option key={comm._id} value={comm.city}>{comm.city}</option>
              })
            }
          </select>
        </form>
        <form action="">
          <label htmlFor=""></label>
          <select name="" id="">
            {
              topics.map(topic => {
                return <option key={topic.name} value={topic.name}>{topic.name}</option>
              })
            }
          </select>
        </form>
      </div>
    </>
  )
}
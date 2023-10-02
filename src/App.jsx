import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

let api = "https://jsonplaceholder.typicode.com/users"

const App = () => {

  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  console.log(search)
  // const [currentPage, setCurrentPage] = useState(1)

  // const recordperpage = 2
  // const lastindex = currentPage * recordperpage
  // const firstindex = lastindex - recordperpage

  // const records = users.slice(firstindex, lastindex)
  // const pages = Math.ceil(users.length / recordperpage)
  // const numbers = [...Array(pages+1).keys()].slice(1)

  const fetchUsers =async (url) => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      if(data.length>0){
        setUsers(data)
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  // const prePage=()=>{
  //   if(currentPage !== firstindex){
  //     setCurrentPage(currentPage-1)
  //   }
  // }
  
  // const changePage=(id)=>{
  //   setCurrentPage(id)
  // }
  
  // const nextPage=()=>{
  //   if(currentPage !== lastindex){
  //     setCurrentPage(currentPage + 1)
  //   }
  // }

  useEffect(()=>{
    fetchUsers(api)
  }, [])

  return (
    <>
      <h1 className='h1'>List of users</h1>

      <div className="search">
        <input type="text" placeholder='Search any user name' className='input' onChange={(e)=>setSearch(e.target.value)}/>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.filter((e)=>{
            return search.toLowerCase() === "" ? e : e.name.toLowerCase().includes(search)
          }).map((e)=>{
            const {street, city, zipcode} = e.address
            return (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td> {street}, {city}, {zipcode} </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* <nav>
        <ul>
          <li>
            <a href="#" onClick={prePage}>Prev</a>

            {numbers.map((e)=>{
              <a href="#" onClick={changePage}>{e}</a>
            })}
            
            <a href="#" onClick={nextPage}>Next</a> 
          </li>
        </ul>
      </nav> */}
    </>
  )
}

export default App
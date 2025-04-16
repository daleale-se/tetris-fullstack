import { useEffect, useState } from "react"
import { getUsers } from "../services/dashboard"
import { UserDataType } from "../types"

const Dashboard = () => {

  const [users, setUsers] = useState<UserDataType[]>([])

  useEffect(() => {
    const fetchSortUsers = async () => {
      const usersData: UserDataType[] = await getUsers()
      setUsers(usersData)
    }
    fetchSortUsers()
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        
          <label htmlFor="">
            <span>sorted by</span>
            <select>
              <option value="high-score" selected>high score</option>
              <option value="level">level</option>
            </select>
          </label>
        
        { 
          users.length > 0
          ? <table>
              <tr>
                <th>User</th>
                <th>Level</th>
                <th style={{paddingLeft:"1rem"}}>Score</th>
              </tr>
              {users.map(({image_path, score, username}) => <tr>
                <td style={{display:"flex", alignItems:"center"}}>
                  <img src={image_path} alt={username+"_img"} style={{width:"50px"}}/>
                  <span style={{marginLeft:".5rem"}}>{username}</span>
                </td>
                <td style={{textAlign:"center"}}>2</td>
                <td style={{paddingLeft:"1rem"}}>{score}</td>
              </tr>
            )}
            </table>
          : <h3>no users!</h3>
        }

      </div>
    </div>
  )
}

export default Dashboard
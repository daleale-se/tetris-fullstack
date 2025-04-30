import { useEffect, useState } from "react"
import { getUsers } from "../services/dashboard"
import { UserDataType } from "../types"

const Dashboard = () => {

  const [users, setUsers] = useState<UserDataType[]>([])
  const [sortBy, setSortBy] = useState<string>("high-score")

  useEffect(() => {
    const fetchSortUsers = async () => {
      const usersData: UserDataType[] = await getUsers()
      setUsers(usersData)
    }
    fetchSortUsers()
  }, [])

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
  
    const sortedUsers = [...users].sort((a, b) => {
      if (value === "high-score") {
        return b.highScore - a.highScore; 
      } else if (value === "level") {
        return b.level - a.level; 
      }
      return 0;
    });
  
    setUsers(sortedUsers);  
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        
          <label>
            <span>sorted by</span>
            <select defaultValue={sortBy} name="sort-by" onChange={handleSelect}>
              <option value="high-score">high score</option>
              <option value="level">level</option>
            </select>
          </label>
        
        { 
          users.length > 0
          ? <table>
              <thead>
                  <tr>
                    <th>User</th>
                    <th>Level</th>
                    <th style={{paddingLeft:"1rem"}}>High Score</th>
                  </tr>
              </thead>
              <tbody>
                {users.map(({imagePath, highScore, username, level}) => 
                  <tr key={username}>
                    <td style={{display:"flex", alignItems:"center"}}>
                      <img src={imagePath} alt={username+"_img"} style={{width:"50px"}}/>
                      <span style={{marginLeft:".5rem"}}>{username}</span>
                    </td>
                    <td style={{textAlign:"center"}}>{level}</td>
                    <td style={{paddingLeft:"1rem"}}>{highScore}</td>
                  </tr>
                )}
              </tbody>
            </table>
          : <h3>no users!</h3>
        }

      </div>
    </div>
  )
}

export default Dashboard
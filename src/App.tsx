import axios from "axios"
import { useEffect } from "react"


const App = () => {

  useEffect(() => {
    axios.get('/task')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>App</div>
  )
}

export default App
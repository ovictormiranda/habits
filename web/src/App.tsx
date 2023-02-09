import './styles/global.css'
import { Habit } from './components/Habit'

function App() {
  return(
    <div>
      <h1>Hello Everyone!</h1>
      <Habit completed={3}/>
      <Habit completed={4}/>
      <Habit completed={5}/>
    </div>
  )

}

export default App

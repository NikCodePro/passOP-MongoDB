import Manager from './components/Manager'
import Navbar from './components/Navbar'

function App() {
  return (
    <div >
      <Navbar />
      <div className="absolute top-0 -z-10 h-full w-full bg-purple-50">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(139,90,196,0.5)] opacity-50 blur-[80px]">
        </div>
      </div>
      <Manager />
    </div>
  )
}

export default App

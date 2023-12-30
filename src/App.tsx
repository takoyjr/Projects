import { Weather } from './components/Weather'
import { Converter } from './components/Converter'

function App() {
  return (
    <div >
      <div>
      <Weather />
      </div>
      <div className='h-screen w-full bg-white flex items-center justify-center'>
        <Converter />
      </div>
      <div>
        
      </div>
    </div>
  );
}


export default App;
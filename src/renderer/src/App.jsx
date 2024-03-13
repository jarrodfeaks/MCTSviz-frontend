import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import Dashboard from "./components/Dashboard";

function App() {
  //const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <PrimeReactProvider>
        <Dashboard />
      </PrimeReactProvider>
    </>
  )
}

export default App


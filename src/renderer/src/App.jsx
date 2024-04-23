import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import Dashboard from "./components/Dashboard";
import OptionsProvider from "./OptionsProvider";

function App() {
  //const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <PrimeReactProvider>
        <OptionsProvider>
          <Dashboard />
        </OptionsProvider>
      </PrimeReactProvider>
    </>
  )
}

export default App


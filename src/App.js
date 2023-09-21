import { useState, useEffect, createContext } from "react";
import SiteRouters from "./SiteRouters";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "./MyNavbar";

export const AppContext = createContext(null);


function App() {
  const [StoreData, setStoreData] = useState(null);
  const url = 'http://127.0.0.1:8000/api/'

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${url}products/`);
        const StoreData = response.data; 
        console.log(StoreData);
        setStoreData(StoreData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (<>
    <AppContext.Provider value={{ StoreData, url }}>
      <MyNavbar/>
      <SiteRouters />
    </AppContext.Provider>
      </>
    );
  }
  
  export default App;
  
 
import React from "react";
import { Provider } from "mobx-react";
import AppRouter from "./routes";
// import { authStore, movieStore, peopleStore } from "./stores";
// const stores = {
//   authStore,
//   movieStore,
//   peopleStore,
// };

const App = () => {
  return (
    <Provider  >
    
        <AppRouter />
      
    </Provider>
  );
};

export default App;



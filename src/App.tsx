import Router from "./shared/Router";
import React, { useReducer } from 'react';
import playerContext, {playerDispatchContext, playerReducer} from "context/player";

function App() {
  const [state, dispatch] = useReducer(playerReducer, false);
  return(
    <playerContext.Provider value={state}>
      <playerDispatchContext.Provider value={dispatch}>
        <Router />
      </playerDispatchContext.Provider>
    </playerContext.Provider>
  )
}

export default App;

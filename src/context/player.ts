import { createContext, Dispatch  } from 'react';

type Action = 
| { type: 'PLAY'; }
| { type: 'STOP'; }

const playerContext = createContext(false);
export const playerDispatchContext = createContext<Dispatch<Action> | null>(null);

export function playerReducer(state: boolean, action: Action ) {
    switch(action.type){
        case "PLAY":{
            state = true
            return state
        }
        case "STOP":{
            state = false
            return state
        }
        default:
        return state;
    }
}

export default playerContext;
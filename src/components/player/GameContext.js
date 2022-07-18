import * as React from 'react';
import { getDayStr } from '../utils';

const GameContext = React.createContext();

let DEFAULT_TODAY_GUEST_LIST = [{
    isCorrect: false,
    isSkipped: false,
    answer: "",
    count: 0,
},
{
    isCorrect: false,
    isSkipped: false,
    answer: "",
    count: 0,
},
{
    isCorrect: false,
    isSkipped: false,
    answer: "",
    count: 0,
},
{
    isCorrect: false,
    isSkipped: false,
    answer: "",
    count: 0,
},
{
    isCorrect: false,
    isSkipped: false,
    answer: "",
    count: 0,
},
{
    isCorrect: false,
    isSkipped: false,
    answer: "",
    count: 0,
}];

const MAX_GUESS_INDEX = 5;


function saveState(state) {

    localStorage.setItem("Game", JSON.stringify(state));
    
}

function loadState() {

    let day = getDayStr();

    let state = localStorage.getItem("Game");
    if (state) {
        
        // decrypt, validate
        // Check date for update state
        if(JSON.parse(state).date.localeCompare(day) === 0) {
            console.info("Game item found")
            // return JSON.parse(state);
        }
        // reset state (not the count)
        else {
            console.info("Game item reset")
            state = resetState(JSON.parse(state),day);
        }
        return JSON.parse(state);
    
    }

    return {
        guessList: DEFAULT_TODAY_GUEST_LIST, 
        lastStep: 0,
        openedStep: 0,
        fails: 0,
        finished: false,
        date: day
    }
}

function resetState(state, day) {

    let latestState = state;

    console.info("Reset State")
    let guessList = state.guessList;

    for(let i = 0; i <= MAX_GUESS_INDEX; i++) {
        guessList[i].isCorrect=false;
        guessList[i].isSkipped=false;
        guessList[i].answer = ""
    }
   
    latestState = {
        ...state,
        guessList: guessList,
        lastStep: 0,
        openedStep: 0,
        finished: false,
        date: day
    }

    saveState(latestState)
    return latestState;
}


function modalReducer(state, action) {
    let latestState = state;

    switch (action.type) {
        case 'SKIP': {
            let guessList = state.guessList;
            let lastStep = state.lastStep;
            let openedStep = state.openedStep;
            let fails = state.fails;

            guessList[lastStep].isSkipped = true;

            let finished = state.finished;
            if (lastStep !== MAX_GUESS_INDEX) {
                lastStep = lastStep + 1
            } else {
                fails = fails + 1;
                finished = true
            }

            latestState = {
                ...state,
                guessList: guessList,
                lastStep: lastStep,
                openedStep: openedStep + 1,
                finished: finished,
                fails: fails
            }
            break
        }
        case 'SUBMIT-WRONG': {
            let guessList = state.guessList;
            let lastStep = state.lastStep;
            let openedStep = state.openedStep;
            let fails = state.fails;
            
            
            guessList[lastStep].answer = action.payload.answer;

            let finished = state.finished;
            if (lastStep !== MAX_GUESS_INDEX) {
                lastStep = lastStep + 1
            } else {
                fails = fails + 1;
                finished = true

            }

            latestState = {
                ...state,
                guessList: guessList,
                lastStep: lastStep,
                finished: finished,
                fails: fails,
                openedStep: openedStep + 1
            }
            break
        }
        case 'SUBMIT-CORRRECT': {
            let guessList = state.guessList;
            let lastStep = state.lastStep;
            let openedStep = state.openedStep;
            
            guessList[lastStep].count = guessList[lastStep].count+1;
            guessList[lastStep].isCorrect = true;
            guessList[lastStep].answer = action.payload.answer;
            
            if (lastStep !== MAX_GUESS_INDEX) {
                lastStep = lastStep + 1
            }

            latestState = {
                ...state,
                guessList: guessList,
                lastStep: lastStep + 1,
                openedStep: openedStep + 1,
                finished: true
            }
            break
        }
        case 'FINISH': {
            let guessList = state.guessList;
            let fails = state.fails;

            guessList[MAX_GUESS_INDEX].isSkipped = true;
            fails = fails + 1;
    

            latestState = {
                ...state,
                guessList: guessList,
                lastStep: MAX_GUESS_INDEX,
                finished: true,
                fails: fails
            }
            break
        }
        case 'RESET': {
            let guessList = state.guessList;
            //load from localstorage
            latestState = {
                ...state,
                guessList: guessList,
                lastStep: 0,
                openedStep: 0,
                finished: false
            }
            break
        }
        case 'SAVE': {
            //load from localstorage
            latestState = {
                ...state
            }
            break
        }
        default: {
            console.error(`Unhandled action type: ${action.type}`)
            latestState = {
                guessList: DEFAULT_TODAY_GUEST_LIST,
                lastStep: 0,
                openedStep: 0,
                finished: false,
                fails: fails
            }
            break
        }
    }

    saveState(latestState);

    return latestState;
}

function GameContextProvider({ children }) {
    //load from localstorage
    const [state, dispatch] = React.useReducer(modalReducer, loadState())
    const value = { state, dispatch }
    return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

function useGameData() {
    const context = React.useContext(GameContext)
    if (context === undefined) {
        throw new Error('useGameData must be used within a GameContextProvider')
    }
    return context
}


export { GameContextProvider, useGameData }
import * as React from 'react'
import { getDayStr } from '../utils'

const GameContext = React.createContext();

let DEFAULT_TODAY_GUEST_LIST = [{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
},
{
    isCorrect: false,
    isSkipped: false,
    answer: ""
}];

const MAX_GUESS_INDEX = 5;


function saveState(state) {
    let now = new Date();

    let stateKey = state.day || getDayStr();
    state.ls = now.getTime();

    // TODO - encrypt
    localStorage.setItem(stateKey, JSON.stringify(state));
}

function loadState() {
    let stateKey = getDayStr();

    let state = localStorage.getItem(stateKey);
    if (state) {
        // decrypt, validate
        return JSON.parse(state);
    }

    return {
        guessList: DEFAULT_TODAY_GUEST_LIST,
        lastStep: 0,
        openedStep: 0,
        finished: false
    }
}


function modalReducer(state, action) {
    let latestState = state;

    switch (action.type) {
        case 'SKIP': {
            let guessList = state.guessList;
            let lastStep = state.lastStep;
            let openedStep = state.openedStep;

            guessList[lastStep].isSkipped = true;

            let finished = state.finished;
            if (lastStep !== MAX_GUESS_INDEX) {
                lastStep = lastStep + 1
            } else {
                finished = true
            }

            latestState = {
                ...state,
                guessList: guessList,
                lastStep: lastStep,
                openedStep: openedStep + 1,
                finished: finished
            }
            break
        }
        case 'SUBMIT-WRONG': {
            let guessList = state.guessList;
            let lastStep = state.lastStep;
            let openedStep = state.openedStep;

            guessList[lastStep].answer = action.payload.answer;

            let finished = state.finished;
            if (lastStep !== MAX_GUESS_INDEX) {
                lastStep = lastStep + 1
            } else {
                finished = true
            }

            latestState = {
                ...state,
                guessList: guessList,
                lastStep: lastStep,
                finished: finished,
                openedStep: openedStep + 1,
            }
            break
        }
        case 'SUBMIT-CORRRECT': {
            let guessList = state.guessList;
            let lastStep = state.lastStep;
            let openedStep = state.openedStep;

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
            guessList[MAX_GUESS_INDEX].isSkipped = true;

            latestState = {
                ...state,
                guessList: guessList,
                lastStep: MAX_GUESS_INDEX,
                finished: true
            }
            break
        }
        case 'RESET': {
            //load from localstorage
            latestState = {
                ...state,
                guessList: DEFAULT_TODAY_GUEST_LIST,
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
                finished: false
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
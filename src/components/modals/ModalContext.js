import * as React from 'react'

// const ThemeContext = React.createContext({ currentModal: "HowToPlay" });
const ModalContext = React.createContext();

function modalReducer(state, action) {
    switch (action.type) {
        case 'HowToPlay': {
            return { currentModal: "HowToPlay" }
        }
        case 'Stats': {
            return { currentModal: "Stats" }
        }
        case 'About': {
            return { currentModal: "About" }
        }
        case 'Hearth': {
            return { currentModal: "Hearth" }
        }
        case 'Reset': {
            return { currentModal: "" }
        }
        default: {
            console.error(`Unhandled action type: ${action.type}`)
            return { currentModal: "" }
        }
    }
}


function ModalContextProvider({ children }) {
    let currentModal = "HowToPlay";
    if (localStorage.getItem("played") === "true") {
        currentModal = ""
    }

    const [state, dispatch] = React.useReducer(modalReducer, { currentModal: currentModal })
    // NOTE: you *might* need to memoize this value
    // Learn more in http://kcd.im/optimize-context
    const value = { state, dispatch }
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

function useModalData() {
    const context = React.useContext(ModalContext)
    if (context === undefined) {
        throw new Error('usModalData must be used within a ModalContextProvider')
    }
    return context
}


export { ModalContextProvider, useModalData }
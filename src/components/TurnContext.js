import React, { createContext } from 'react';

export const TurnContext = createContext();

export const TurnProvider = (props) => {
    const turns = [
        {
            turnNumber: 0,
            player: "",
            A1: "",
            A2: "",
            A3: "",
            B1: "",
            B2: "",
            B3: "",
            C1: "",
            C2: "",
            C3: "",
            matrix: [
                [{A1: ""}, {A2: ""}, {A3:""}],
                [{B1: ""}, {B2: ""}, {B3:""}],
                [{C1: ""}, {C2: ""}, {C3:""}],
            ]
        },
    ];

    return(
        <TurnContext.Provider value={turns}>
            {props.children}
        </TurnContext.Provider>
    );
}

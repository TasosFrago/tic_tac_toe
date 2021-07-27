import React, { Component } from 'react';
import { TurnProvider } from './TurnContext';

import Board from './board/Board';

class App extends Component {
    render() {
        return(
            <TurnProvider>
                <Board />
            </TurnProvider>
        )
    }
}

export default App;

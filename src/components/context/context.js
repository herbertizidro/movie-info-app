import React from 'react'

/* definição do contexto da aplicação */

const AppContext = React.createContext()

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

export default AppContext;

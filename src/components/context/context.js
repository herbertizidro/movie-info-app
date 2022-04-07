import React from 'react'

/* definição do contexto da aplicação */

const AppContext = React.createContext()

export const AppProvider = AppContext.Provider;
/* 
export const AppConsumer = AppContext.Consumer;
  
  //caso fosse acessar o contexto dessa forma: 
  return(
    <AppConsumer.Consumer>
      {value => (
        <>
          <h3>{value.title}</h3>
        </>
       )}
    </AppConsumer.Consumer>
   )
*/

export default AppContext;

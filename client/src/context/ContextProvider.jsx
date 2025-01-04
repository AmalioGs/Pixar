import { createContext } from 'react'

export const PixarContext = createContext();

export const ContextProvider = ({children}) => {
  return (
    <PixarContext.Provider value={{}}>
      {children}
    </PixarContext.Provider>
  )
}


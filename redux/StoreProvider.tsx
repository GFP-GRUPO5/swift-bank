import { ReactNode, useRef } from "react";
import { Provider } from 'react-redux';
import { AppStore, makeStore } from "./store";

interface Props { 
  children: ReactNode
}

export default function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      { children }
    </Provider>
  )
}

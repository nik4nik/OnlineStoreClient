import {createContext} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import MapStore from './store/MapStore'
import ProductStore from './store/ProductStore'
import UserStore from './store/UserStore'

export const Context = createContext()

createRoot(document.getElementById`root`).render(
	<Context.Provider value={{
		user: new UserStore(),
		product: new ProductStore(),
		leaflet: new MapStore()
	}}><App/>
	</Context.Provider>
)
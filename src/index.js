import App from './AllApps/AppComponent/App';
import ConfigureStore from './AllApps/Store/ConfigStore'
import React from 'react';
import reportWebVitals from './reportWebVitals';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { StrictMode } from 'react';

import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const ProviderComponent = () => {
    const store = ConfigureStore();

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
    
root.render(
    <StrictMode>
        <ProviderComponent />
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

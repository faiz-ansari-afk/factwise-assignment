import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {
  ModuleRegistry,
  AllCommunityModule,
  ValidationModule,
} from 'ag-grid-community';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';


ModuleRegistry.registerModules([AllCommunityModule]);
if (import.meta.env.NODE_ENV !== 'production') {
  ModuleRegistry.registerModules([ValidationModule]);
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

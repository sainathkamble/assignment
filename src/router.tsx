import React , { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import {FirstPage} from './firstpage.tsx';
import { SecondPage } from './secondpage.tsx';

export const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>  
    </Router>
  );
}

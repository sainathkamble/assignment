import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import {FirstPage} from './firstpage.tsx';
import { SecondPage } from './secondpage.tsx';

type MyComponentProps = {
  children: React.ReactNode;
};

export const Routers : React.FC<MyComponentProps> = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>  
    </Router>
  );
}

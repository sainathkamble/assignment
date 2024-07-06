import { FirstComponent } from './components/compo1.tsx';
import { SecondComponent } from './components/compo2.tsx';

//Cobine compo1 & compo2 in second page
export const SecondPage = () => {
  return (
    <>
    <FirstComponent />
    <SecondComponent />
    </>
  );
}
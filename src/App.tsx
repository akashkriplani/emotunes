import { FC } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import FaceDetect from './components/FaceDetect';

const App: FC = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-start flex-row">
        <FaceDetect />
      </div>
      <Footer />
    </div>
  );
};

export default App;

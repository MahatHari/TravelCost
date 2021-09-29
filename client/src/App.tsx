import React from 'react';
import MapLeaflet from './components/MapLeaflet';
import MainNav from './components/MainNav';
import ResponseProvider from './components/ResponseProvider';
import ErrorProvider from './components/ErrorContext';
import ErrorBox from './components/ErrorBox';
import LoaderModal from './components/LoaderModal';

function App(): JSX.Element {
  return (
    <div className='h-screen w-screen'>
      {/* They gray here is for debuging */}
      <ErrorProvider>
        <ResponseProvider>
          <LoaderModal />
          <MapLeaflet>
            <ErrorBox />
            <MainNav />
          </MapLeaflet>
        </ResponseProvider>
      </ErrorProvider>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { StorageType } from '../lib/types';
import { useExperiment } from '../lib/useExperiment';
import './App.css';

function App() {
  const [storageValue, setStorageValue] = useState('');

  const { ExperimentComponent } = useExperiment({
    weights: [50, 50],
    variants: [
      <div key="with">with pre onboarding screen</div>,
      <div key="without">without pre onboarding screen</div>,
    ],
    logger: (variant) => console.log(`User placed in group ${variant} from hook`),
    storageType: StorageType.Local,
    storageKey: 'experimentWithHook',
    enableLogging: true,
    variantIdentifiers: ['withPreOnboardingScreen', 'withoutPreOnboardingScreen'],
  });

  useEffect(() => {
    const value = localStorage.getItem('experimentWithHook');
    setStorageValue(value || 'No value stored');
  }, []);

  const clearStorage = () => {
    localStorage.removeItem('experimentWithHook');
    window.location.reload();
  };

  return (
    <div className="app-container">
      <div className="demo-section">
        <div>Example with hook</div>
        {ExperimentComponent}
      </div>

      <div className="control-section">
        <button onClick={clearStorage}>Clear Storage</button>
        <div>
          <p>Stored Value: {storageValue}</p>
          <p>Stored in: Local Storage</p>
        </div>
      </div>
    </div>
  );
}

export default App;

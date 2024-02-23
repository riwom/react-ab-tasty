import { useExperiment } from './useExperiment';
import { StorageType } from './types';

function App() {
  const { ExperimentComponent } = useExperiment({
    weights: [0.5, 0.5],
    variants: [<div>Variant A</div>, <div>Variant B</div>],
    logger: (variant) => console.log(`User placed in group ${variant}.`),
    storageType: StorageType.Local,
    storageKey: 'customExperimentKey',
    enableLogging: true,
  });

  return <>{ExperimentComponent}</>;
}

export default App;

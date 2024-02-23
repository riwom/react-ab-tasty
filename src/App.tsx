import { useExperiment } from './lib/useExperiment';
import { Experiment } from './lib/Experiment';

import { StorageType } from './lib/types';

function App() {
  const { ExperimentComponent } = useExperiment({
    weights: [50, 50],
    variants: [<div>Variant A</div>, <div>Variant B</div>],
    logger: (variant) => console.log(`User placed in group ${variant} from hook`),
    storageType: StorageType.Local,
    storageKey: 'experimentWithHook',
    enableLogging: true,
  });

  const logger = (variant: string) => {
    console.log(`Current variant with component: ${variant}`);
  };

  return (
    <div>
      <div>
        <div>Example with hook</div>
        {ExperimentComponent}
      </div>

      <div>
        <div>Example with component</div>
        <Experiment
          weights={[10, 20, 70]}
          variants={[<div>Variant 1</div>, <div>Variant 2</div>, <div>Variant 3</div>]}
          logger={logger}
          storageKey="experimentWithComponent"
        />
      </div>
    </div>
  );
}

export default App;

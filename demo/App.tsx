import { Experiment } from '../lib/Experiment';
import { useExperiment } from '../lib/useExperiment';

import { StorageType } from '../lib/types';

function App() {
  const { ExperimentComponent } = useExperiment({
    weights: [50, 50],
    variants: [<div>with pre onboarding screen</div>, <div>without pre onboarding screen</div>],
    logger: (variant) => console.log(`User placed in group ${variant} from hook`),
    storageType: StorageType.Local,
    storageKey: 'experimentWithHook',
    enableLogging: true,
    variantIdentifiers: ['withPreOnboardingScreen', 'withoutPreOnboardingScreen'],
  });

  const loggerForComponent = (variantForComponent: string) => {
    console.log(`Current variant with component: ${variantForComponent}`);
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
          logger={loggerForComponent}
          storageKey="experimentWithComponent"
          variantIdentifiers={['A', 'B', 'C']}
          enableLogging={true}
        />
      </div>
    </div>
  );
}

export default App;

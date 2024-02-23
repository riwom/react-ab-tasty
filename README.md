# react-ab-tasty

- 🏞️ Easy to Integrate: Simplifies the implementation of A/B testing in React projects
- 🔍 Logging Support: Integrated logging capabilities for monitoring variant selection
- 🔒 Storage flexibility: Supports both localStorage and sessionStorage for experiment state persistence.


## Usage

> yarn add react-ab-tasty

```ts
import React from 'react';
import { useExperiment } from 'react-ab-tasty';

const MyComponent = () => {
  const { ExperimentComponent } = useExperiment({
    variants: [<VariantA />, <VariantB />], // React components for each variant
    weights: [50, 50], // Probability weights for each variant
    logger: console.log, // Optional logging function
    storageType: 'local', // Optional, 'local' or 'session', defaults to 'local'
    storageKey: 'experimentWin', // Optional, key used in storage, defaults to 'experimentWin'
    enableLogging: false, // Optional, enables logging if true
  });

  return (
    <div>
      {ExperimentComponent}
    </div>
  );
};

export default MyComponent;
```

## Configuration Options

- **variants**: An array of React components representing each variant in the experiment
- **weights**: Corresponding weights for each variant, indicating their selection probability
- **logger**: A function for logging variant selection. Defaults to a no-op function if not provided
- **storageType**: Specifies the type of web storage to use ('local' for localStorage or 'session' for sessionStorage). Defaults to 'local'
- **storageKey**: The key under which the selected variant index is stored. Helps in persisting the experiment across sessions
- **enableLogging**: If true, enables logging of the selected variant using the provided logger function


### Types & Options

```ts
type Variant = React.ReactNode;
type LoggerFunction = (variant: string) => void;

enum StorageType {
  Local = 'local',
  Session = 'session',
}

interface UseExperimentProps {
  weights: number[];
  variants: Variant[];
  logger: LoggerFunction;
  storageType?: StorageType;
  storageKey?: string;
  enableLogging?: boolean;
}

interface UseExperimentResult {
  ExperimentComponent: React.ReactNode;
}
```

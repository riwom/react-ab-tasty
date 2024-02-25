![react-ab-tasty](./banner.png)

[![SWUbanner](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct-single.svg)](https://stand-with-ukraine.pp.ua/)

# react-ab-tasty

- 🏞️ Easy to Integrate: Simplifies the implementation of A/B testing in React projects
- 🔍 Logging Support: Integrated logging capabilities for monitoring variant selection
- 🔒 Storage flexibility: Supports both localStorage and sessionStorage for experiment state persistence.

## Usage

```shell
yarn add react-ab-tasty
```

```ts
import React from 'react';
import { useExperiment } from 'react-ab-tasty';

const MyComponent = () => {
  const { ExperimentComponent } = useExperiment({
    variants: [<VariantA />, <VariantB />], // React components for each variant
    weights: [50, 50], // Probability weights for each variant
    logger: logger: (variant) => console.log(`User placed in group ${variant} from hook`), // Optional logging function
    storageType: 'local', // Optional, 'local' or 'session', defaults to 'local'
    storageKey: 'experimentWin', // Optional, key used in storage, defaults to 'experimentWin'
    enableLogging: false, // Optional, enables logging if true
    variantIdentifiers: ["a", "b"], // Optional, array of strings that serve as identifiers for each variant
  });

  return (
    <div>
      {ExperimentComponent}
    </div>
  );
};

export default MyComponent;
```

```ts
import React from 'react';
import { Experiment } from 'react-ab-tasty';

const MyComponent = () => {
  const logger = (variant: string) => {
    console.log(`Current variant with component: ${variant}`);
  };

  return (
    <div>
      <Experiment
        weights={[10, 20, 70]}
        variants={[<div>Variant 1</div>, <div>Variant 2</div>, <div>Variant 3</div>]}
        logger={logger}
        storageKey="experimentWithComponent"
        variantIdentifiers={[
          'this is first variant',
          'this is second variant',
          'this is last variant',
        ]}
      />
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
- **variantIdentifiers** An array of strings that serve as identifiers for each variant. This is useful for labeling your variants in a more descriptive way than just by index. It can also be used in conjunction with the logging function to provide clearer insight into which variant a user has been placed in.

### Types & Options

```ts
type Variant = React.ReactNode;
type LoggerFunction = (variant: string) => void;
type VariantIdentifier = string;

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
  variantIdentifiers?: VariantIdentifier[];
}

interface UseExperimentResult {
  ExperimentComponent: React.ReactNode;
}
```

import { UseExperimentProps } from './types';
import { useExperiment } from './useExperiment';

interface ExperimentProps extends UseExperimentProps {}

export const Experiment: React.FC<ExperimentProps> = ({
  weights,
  variants,
  logger,
  storageType,
  storageKey,
  enableLogging,
  variantIdentifiers,
}) => {
  const { ExperimentComponent } = useExperiment({
    weights,
    variants,
    logger,
    storageType,
    storageKey,
    enableLogging,
    variantIdentifiers,
  });

  return <>{ExperimentComponent}</>;
};

import { useExperiment } from './useExperiment';
import { UseExperimentProps } from './types';

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

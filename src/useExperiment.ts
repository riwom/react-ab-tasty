import { useCallback, useEffect, useState, ReactNode } from 'react';
import { StorageType, UseExperimentProps, UseExperimentResult } from './types';

export const useExperiment = ({
  weights,
  variants,
  logger,
  storageType = StorageType.Local,
  storageKey = 'experimentWin',
  enableLogging = false,
}: UseExperimentProps): UseExperimentResult => {
  const [experimentState, setExperimentState] = useState<{
    isExperimentSelected: boolean;
    ExperimentComponent: ReactNode | null;
  }>({
    isExperimentSelected: false,
    ExperimentComponent: null,
  });

  const getSelectedVariant = useCallback(() => {
    const storage = storageType === 'session' ? sessionStorage : localStorage;
    let selectedVariant = parseInt(storage.getItem(storageKey) || '', 10);

    if (!isNaN(selectedVariant) && selectedVariant < variants.length) {
      return selectedVariant;
    }

    const totalWeight = weights.reduce((acc, current) => acc + current, 0);
    let randomNum = Math.random() * totalWeight;
    selectedVariant = 0;

    for (let i = 0; i < weights.length; i++) {
      if (randomNum < weights[i]) {
        selectedVariant = i;
        break;
      }
      randomNum -= weights[i];
    }

    storage.setItem(storageKey, selectedVariant.toString());
    return selectedVariant;
  }, [weights, variants, storageType, storageKey]);

  useEffect(() => {
    if (experimentState.isExperimentSelected) {
      return;
    }

    const selectedVariant = getSelectedVariant();
    const ExperimentComponent = variants[selectedVariant];

    if (enableLogging) {
      logger(`Variant ${selectedVariant}`);
    }

    setExperimentState({
      isExperimentSelected: true,
      ExperimentComponent,
    });
  }, [experimentState.isExperimentSelected, getSelectedVariant, variants, enableLogging, logger]);

  return { ExperimentComponent: experimentState.ExperimentComponent };
};

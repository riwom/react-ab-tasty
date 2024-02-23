import { useCallback, useEffect, useState, ReactNode } from 'react';
import { StorageType, UseExperimentProps, UseExperimentResult } from './types';

export const useExperiment = ({
  weights,
  variants,
  logger,
  variantIdentifiers = variants.map((_, index) => index.toString()),
  storageType = StorageType.Local,
  storageKey = 'experimentWin',
  enableLogging = false,
}: UseExperimentProps & { variantIdentifiers?: string[] }): UseExperimentResult => {
  const [experimentState, setExperimentState] = useState<{
    isExperimentSelected: boolean;
    ExperimentComponent: ReactNode | null;
  }>({
    isExperimentSelected: false,
    ExperimentComponent: null,
  });

  const getSelectedVariant = useCallback(() => {
    const storage = storageType === 'session' ? sessionStorage : localStorage;
    const storedValue = storage.getItem(storageKey) || '';
    let selectedVariantIndex = parseInt(storedValue, 10);
    let selectedVariantIdentifier = storedValue;

    if (!isNaN(selectedVariantIndex) && selectedVariantIndex < variants.length) {
      return variants[selectedVariantIndex];
    } else if (variantIdentifiers.includes(storedValue)) {
      selectedVariantIndex = variantIdentifiers.indexOf(storedValue);
      return variants[selectedVariantIndex];
    }

    const totalWeight = weights.reduce((acc, current) => acc + current, 0);
    let randomNum = Math.random() * totalWeight;

    for (let i = 0; i < weights.length; i++) {
      if (randomNum < weights[i]) {
        selectedVariantIndex = i;
        selectedVariantIdentifier = variantIdentifiers[i];
        break;
      }
      randomNum -= weights[i];
    }

    storage.setItem(storageKey, selectedVariantIdentifier);
    return variants[selectedVariantIndex];
  }, [weights, variants, variantIdentifiers, storageType, storageKey]);

  useEffect(() => {
    if (experimentState.isExperimentSelected) {
      return;
    }

    const ExperimentComponent = getSelectedVariant();

    if (enableLogging) {
      logger(`Variant ${variantIdentifiers[variants.indexOf(ExperimentComponent)]}`);
    }

    setExperimentState({
      isExperimentSelected: true,
      ExperimentComponent,
    });
  }, [
    experimentState.isExperimentSelected,
    getSelectedVariant,
    variants,
    variantIdentifiers,
    enableLogging,
    logger,
  ]);

  return { ExperimentComponent: experimentState.ExperimentComponent };
};

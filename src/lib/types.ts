import React from 'react';

type Variant = React.ReactNode;
type LoggerFunction = (variant: string) => void;

export enum StorageType {
  Local = 'local',
  Session = 'session',
}

export interface UseExperimentProps {
  weights: number[];
  variants: Variant[];
  logger: LoggerFunction;
  storageType?: StorageType;
  storageKey?: string;
  enableLogging?: boolean;
}

export interface UseExperimentResult {
  ExperimentComponent: React.ReactNode;
}

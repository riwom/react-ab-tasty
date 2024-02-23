type Variant = React.ReactNode;
type LoggerFunction = (variant: string) => void;
export type VariantIdentifier = string;

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
  variantIdentifiers?: VariantIdentifier[];
}

export interface UseExperimentResult {
  ExperimentComponent: React.ReactNode;
}

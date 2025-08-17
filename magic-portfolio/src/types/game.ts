export interface GameConfig {
  src: string;
  title: string;
  aspectRatio?: number;
  maxWidth?: string;
  minHeight?: string;
  loading?: 'eager' | 'lazy';
}

export interface GameFrameProps {
  config?: Partial<GameConfig>;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export interface GameState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}
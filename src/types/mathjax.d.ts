declare global {
  interface Window {
    MathJax?: {
      typesetPromise: () => Promise<void>;
      typesetClear?: () => void;
    };
  }
}

export {};

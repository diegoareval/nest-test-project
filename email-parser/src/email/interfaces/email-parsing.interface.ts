export interface EmailParsingStrategy {
    applyStrategy(data: any): void;
  }
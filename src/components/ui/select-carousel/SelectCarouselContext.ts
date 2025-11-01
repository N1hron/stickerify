import { createContext, use } from 'react';

export type SelectCarouselContextValue = {
  value: string;
  index: number;
  maxIndex: number;
  setIndex: (index: number) => void;
  valueId: string;
};

export const SelectCarouselContext = createContext<SelectCarouselContextValue | null>(null);

export function useSelectCarouselContext() {
  return use(SelectCarouselContext)!;
}

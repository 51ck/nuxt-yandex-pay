import { useNuxtApp } from 'nuxt/app';

export const useYaPay = () => {
  const { $YaPay } = useNuxtApp();
  console.log({ $YaPay });
  return $YaPay;
}

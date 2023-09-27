import { useContext } from '@nuxtjs/composition-api';

export const useYaPay = () => {
  const { $YaPay } = useContext();
  console.log({ $YaPay });
  return $YaPay;
}

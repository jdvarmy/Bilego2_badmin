import { useSearchParams } from 'react-router-dom';

export function useLocalSearchParams(): Record<string, string> {
  const [searchParams] = useSearchParams();

  const params: Record<string, string> = {};
  // @ts-ignore
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
}

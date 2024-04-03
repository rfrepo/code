// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useNavigation as useReactNativeNavigation } from '@react-navigation/native'

type Navigation = {
  [key: string]: () => void
}

export const useNavigation = <T>(...rest: T): Navigation => {
  const navigator = useReactNativeNavigation()

  return rest.reduce(
    (acc: Record<string, () => void>, curr: string, index: number) => {
      acc[`navigateTo${rest[index]}`] = () => navigator.navigate(curr)

      acc[`replaceWith${rest[index]}`] = () => navigator.replace(curr)

      return acc
    },

    {
      goBack: (stack = '', screen = '') => {
        if (navigator.canGoBack()) navigator.goBack()
        else if (stack && screen) navigator.navigate(stack, screen)
        else navigator.navigate('AppNavigatorStack', { screen: 'FoldCard' })
      },
      navigateWithStackTo: (stack = '', screen = '') => {
        navigator.navigate(stack, screen)
      }
    }
  )
}


/*

type ObjectWithAppendedKeys<T extends string[]> = {
  [K in T[number] as `${Capitalize<K>}Unique`]: any;
};

// Example usage:
const createObjectWithAppendedKeys = <T extends string[]>(...keys: T): ObjectWithAppendedKeys<T> => {
  const obj = {} as ObjectWithAppendedKeys<T>;
  keys.forEach(key => {
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1); // Capitalizing the first letter
    obj[`${capitalizedKey}Unique`] = null; // Appending 'Unique' to the key
  });
  return obj;
};

// Test
const obj = createObjectWithAppendedKeys('key1', 'key2', 'key3');

obj.

 */

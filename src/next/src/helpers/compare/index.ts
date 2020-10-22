/**
 * Сравниваем равенство двух объектов и логируем результат.
 * При этом для удобства выводим ошибку только тогда, когда оба объекта имеются
 * и они не равны друг другу.
 * 
 */

/**
 * Пример использования
 const compare__context = useMemo(() => {
 
   console.log('compare__context useMemo');
 
   let target = contextValue;
 
   return (a: typeof contextValue) => {
 
     console.log('compare__context a', a);
 
     if (!compare("compare__context", a, target)) {
       target = a;
     }
   }
 
 }, [contextValue]);
 
 compare__context(contextValue);
 */


function compare<T>(title: string, a: T, b?: T): boolean {

  const equal = a === b;

  // eslint-disable-next-line no-console
  console.log(title, "a === b", equal);

  if (!equal && b !== undefined) {

    console.error(title, "a !== b");

    /**
     * Compare types
     */
    if (typeof a !== typeof b) {

      console.error(title, `typeof a "${typeof a}" !== typeof b "${typeof b}"`);
    }
    /**
     * Compare objects fields
     */
    else if (typeof a === "object" && typeof b === "object") {

      // TODO: реализовать проверку полей в обе стороны
      const compareFields = (objectA: typeof a, objectB: typeof b) => {
        for (const i in objectA) {
          if (objectA[i] !== objectB[i]) {
            console.error(title, `a["${i}"] !== b["${i}"]`, objectA[i], objectB[i]);
          }
        }
      }

      compareFields(a, b);

    }
  }

  return equal;
}

export default compare;

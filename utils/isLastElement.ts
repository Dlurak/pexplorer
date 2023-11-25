export const isLastElementOfList = <T>(element: T, list: T[]) =>
  element === list[list.length - 1];

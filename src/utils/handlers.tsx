export const genQuery = (timeRange: number, componentName: string) =>
  `SELECT ${timeRange} WHERE c = ${componentName}`;

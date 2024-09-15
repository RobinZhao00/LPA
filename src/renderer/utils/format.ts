const formatSarlay = (str: string): number[] => {
  let rawStr = '';
  let byDay = false;
  if (str.includes('K')) {
    [rawStr] = str.split('K');
  }
  if (str.includes('元/天')) {
    [rawStr] = str.split('元/天');
    byDay = true;
  }
  return rawStr
    .split('-')
    .map((slary) => (byDay ? parseInt(slary, 10) / 1000 : parseInt(slary, 10)));
};

export { formatSarlay };

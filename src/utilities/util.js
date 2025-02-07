export const generateId = () => {
  const array = new Uint32Array(4);
  crypto.getRandomValues(array);

  const timestamp = Date.now().toString(16);
  const randomPart = Array.from(array, (x) =>
    x.toString(16).padStart(8, '0')
  ).join('');

  return `${timestamp}-${randomPart}`;
};

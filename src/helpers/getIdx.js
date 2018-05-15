// @flow

// random number generator
// cause I don't need anything too sophisticated
export default function getIdx(array: Array<*>) {
  const { length } = array;
  return Math.floor(Math.random() * length);
}

export const toMillisecondsNumber = (str) => {
   return ~~str.substr(0, str.length - 1) * 1000;
}
export const toSecondString = (ms) => {
   return ms/1000 + 's';
}

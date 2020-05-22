// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
//https://stackoverflow.com/a/53486112
export function debounce(fn, delay) {
  var timeoutID = null;
  return function() {
    clearTimeout(timeoutID);
    var args = arguments;
    var that = this;
    timeoutID = setTimeout(function() {
      fn.apply(that, args);
    }, delay);
  };
}

//this boy cleaner
// export const debounce = (fn, time) => {
//     let timeout;

//     return function() {
//       const functionCall = () => fn.apply(this, arguments);

//       clearTimeout(timeout);
//       timeout = setTimeout(functionCall, time);
//     }
//   }

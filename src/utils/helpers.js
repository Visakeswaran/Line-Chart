/* eslint-disable */

export const _numberToHumanReadableFormatConverter = (
  number,
  decimal = true,
  sepValUnit = false
) => {
  let num =
    Math.abs(Number(number)) >= 1.0e9
      ? `${(Math.abs(Number(number)) / 1.0e9).toFixed(decimal ? 2 : 0)}B`
      : Math.abs(Number(number)) >= 1.0e6
      ? `${(Math.abs(Number(number)) / 1.0e6).toFixed(decimal ? 2 : 0)}M`
      : Math.abs(Number(number)) >= 1.0e3
      ? (Math.abs(Number(number)) / 1.0e3).toFixed(decimal ? 2 : 0) + "K"
      : Math.abs(Number(number));

  if (num == 0) {
    return "0";
  }

  if (sepValUnit && typeof num === "string") {
    num = [num.slice(0, num.length - 1), num.slice(num.length - 1, num.length)];
  }

  return num % 1 != 0 ? num : num / 1;
};

export const secToString = secs => {
  var sec_num = parseInt(secs, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

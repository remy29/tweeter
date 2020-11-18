const timeAgo = function(ts) {
  // This function computes the delta between the
  // provided timestamp and the current time, then test
  // the delta for predefined ranges.

  let d = new Date();  // Gets the current time
  let nowTs = d.getTime(); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
  let seconds = (nowTs - ts) / 1000;

  if (seconds > 30 * 24 * 3600) {
    return "over a year ago"
  }

  if (seconds > 30 * 24 * 3600) {
    return "over a month ago"
  }

  if (seconds > 7 * 24 * 3600) {
    return "over a week ago"
  }
  // more that two days
  if (seconds > 2 * 24 * 3600) {
    return "a few days ago";
  }
  // a day
  if (seconds > 24 * 3600) {
    return "yesterday";
  }

  if (seconds > 3600) {
    return "a few hours ago";
  }
  if (seconds > 1800) {
    return "Half an hour ago";
  }
  if (seconds > 60) {
    return Math.floor(seconds / 60) + " minutes ago";
  }
  if (seconds < 60) {
    return Math.floor(seconds) + " seconds ago";
  }
};

module.exports = timeAgo
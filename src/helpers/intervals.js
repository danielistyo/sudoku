export const interval = {
  // to keep a reference to all the intervals
  intervals: new Set(),

  // create another interval
  make(...args) {
    var newInterval = setInterval(...args);
    this.intervals.add(newInterval);
    return newInterval;
  },

  // clear a single interval
  clear(id) {
    this.intervals.delete(id);
    return clearInterval(id);
  },

  // clear all intervals
  clearAll() {
    for (var id of this.intervals) {
      this.clear(id);
    }
  }
};

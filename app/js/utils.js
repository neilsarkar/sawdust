(function() {
  window.utils = {
    // Turns a number of seconds into a human readable time
    timeString: function(seconds) {
      var minutes = parseInt(seconds / 60),
          hours = parseInt(minutes / 60);

      if( hours ) {
        return pluralize(hours, "hour") + ", " + pluralize(minutes, "minute");
      } else if( minutes ) {
        return pluralize(minutes, "minute");
      } else {
        return seconds;
      }
    }
  }

  function pluralize(amount, string) {
    return amount == 1 ? "1 " + string : amount + " " + string + "s";
  }
})()

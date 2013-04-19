var user = {
  name: null,

  init: function (name) {
    var self = this;
    self.name = name;
    $('#myname').html(self.name);
  }
};
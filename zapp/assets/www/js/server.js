var server = {
  url: null,

  init: function (url) {
    var self = this;
    self.url = url; //'http://tvhackfest.workatplay.com/zapp/yii/zappserv/index.php';
  },
  get: function (endpoint, data, callback) {
  	var self = this;
  	data['r'] = endpoint;

    $.ajax({
      dataType: "json",
      url: self.url,
      data: data,
      success: callback
    });
  },
  post: function (endpoint, data, callback) {
  	var self = this;

    $.ajax({
      type: 'post',
      dataType: "json",
      url: self.url + '?r=' + endpoint,
      data: data,
      success: callback
    });
  }
};
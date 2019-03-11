
(function($, window, document, undefined) {
    $.fn.bsPictureAlign = function(options) {
      var num = this.length,
        loadnum = 0;
      //若為多個容器，分別初始化每個容器
      for (i = 0; i < this.length; i++) {
        var _this = this[i];
        //創建bsPictureAlign實體
        var bsPictureAlign = new BsPictureAlign(_this, options);
        //調用其方法
        if (options.style == "full") bsPictureAlign.full();
        if (options.style == "fill") bsPictureAlign.fill({
          //這裡增加了回調函數，確保所有圖片處理完畢後進行回調
          callback: function() {
            loadnum++;
            if (num == loadnum && options.loadover) {
              options.loadover();
            }
          }
        });
      }
    };
    //定義原型
    var BsPictureAlign = function(ele, opt) {
      this.$ele = ele;
      //若無定義寬高背景，使用默認值
        this.defaults = {
          "width": "100%",
          "height": "300px",
          "background": "#000"
        };
        this.options = $.extend({}, this.defaults, opt);
    };
    BsPictureAlign.prototype = {
      //定義fill方法
      fill: function(opc) {
        var that = this,
          _options = that.options,
          _ele = $(this.$ele),
          _dom = _options.img_dom,
          _img = _dom ? _ele.find(_dom) : _ele.find("img"),
          _this, _width, _height, _ratio, _w, _h, _r, _wider;
        //修改圖片容器寬高
        _ele.css({
          "width": _options.width,
          "height": _options.height,
          "overflow": "hidden",
          "background": _options.background,
          "position": "relative"
        });
        //容器比例
        _width = _ele.width();
        _height = _ele.height();
        _ratio = _width / _height;
        //每張所選圖片進行處理
        _img.each(function() {
          _this = $(this);
          //此處可選，用來保證圖片加載完之前不可見
          _this.css({
            'opacity': 0,
          });
          //此處確保圖片加載完畢
          _this.load(function() {
            _w = _this.width();
            _h = _this.height();
            _r = _w / _h;
            _wider = _r > _ratio ? true : false;
            //容器寬高比小於圖片時，圖片高度100%，寬度按比例縮放
            if (_wider) {
              _this.css({
                "width": "100%",
                "height": "auto"
              });
              var _top = (_height - _this.height()) / 2;
              _this.css({
                "position": "absolute",
                "top": _top + "px",
                "left": 0
              });
            //容器寬高比大於圖片時，圖片寬度100%，高度按比例縮放
            } else {
              _this.css({
                "width": "auto",
                "height": "100%"
              });
              var _left = (_width - _this.width()) / 2;
              _this.css({
                "position": "absolute",
                "top": 0,
                "left": _left + "px"
              });
            }
            _this.css({
              'opacity': 1,
            });
            if (opc.callback) opc.callback();
          });
          //此處圖片加載失敗處理
          _this.error(function() {
            if (opc.callback) opc.callback();
            _this.css({
              'opacity': 1,
            });
          });
        });
        //鏈式回調
        return this;
      },
      //定義full方法
      full: function() {
        var that = this,
          _options = that.options,
          _ele = $(this.$ele),
          _img = _ele.find("img"),
          _this, _width, _height, _ratio, _w, _h, _r, _wider;
        //修改圖片外殼寬高
        _ele.css({
          "width": _options.width,
          "height": _options.height,
          "overflow": "hidden",
          "background": "#000",
          "position": "relative"
        });
        //容器比例
        _width = _ele.width();
        _height = _ele.height();
        _ratio = _width / _height;
        //每張所選圖片進行處理
        _img.each(function() {
          _this = $(this);
          //此處確保圖片加載完畢
          _this.load(function() {
            _w = _this.width();
            _h = _this.height();
            _r = _w / _h;
            _wider = _r > _ratio ? true : false;
            //容器寬高比大於圖片時，圖片高度100%，寬度按比例縮放按比例縮放
            if (_wider) {
              _this.css({
                "width": "auto",
                "height": "100%"
              });
              var _left = (_width - _this.width()) / 2;
              _this.css({
                "position": "absolute",
                "top": 0,
                "left": _left + "px"
              });
            //容器寬高比小於圖片時，圖片寬度100%，高度按比例縮放按比例縮放
            } else {
              _this.css({
                "width": "100%",
                "height": "auto"
              });
              var _top = (_height - _this.height()) / 2;
              _this.css({
                "position": "absolute",
                "top": _top + "px",
                "left": 0
              });
            }
          });
        });
        //鏈式回調
        return this;
      },
    }
  })(jQuery, window, document);
/*
 * This adds a bbox capture control
 * TODO: Better comments
 * TODO: Sanitize bbox - set max area for bbox?
 */

L.Control.ODE = L.Control.extend({
  options: {
    position: 'topleft',
    url: '//ode.mapzen.com',
    icon: 'fa fa-bullseye',
    title: 'Click to download the extract for the selected bbox'
  },

  initialize: function (options) {
    L.Util.setOptions(this, options);
  },

  callODE: function(endpoint, params) {
    L.DomUtil.addClass(this._icon, 'fa-spin');
    params = serialize(params);
    window.open(endpoint+'?'+params);
    var self = this;
    window.setTimeout(function(){
      L.DomUtil.removeClass(self._icon, 'fa-spin');
    }, 1000);
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('div',
        'ode-control leaflet-bar leaflet-control');

    var self = this;
    this._layer = new L.LayerGroup();
    this._layer.addTo(map);

    this._container = container;

    this._link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single', container);
    this._link.href = '#';
    this._link.title = this.options.title;
    this._icon = L.DomUtil.create('span', this.options.icon, this._link);

    this._results = L.DomUtil.create('div', 'pelias-results leaflet-bar', this._container);

    L.DomEvent
      .on(this._container, 'click', function(e){
          var a = window.areaSelect.getBounds();
          var params = {
            n: a.getNorth(),
            e: a.getEast(),
            w: a.getWest(),
            s: a.getSouth()
          }

          this.callODE(this.options.url, params);
        }, this)

    L.DomEvent.disableClickPropagation(this._container);

    if (map.attributionControl) {
      map.attributionControl.addAttribution(this.options.attribution);
    }
    return container;
  },

  onRemove: function (map) {
    map.attributionControl.removeAttribution(this.options.attribution);
  }
});

L.control.ode = function (options) {
  return new L.Control.ODE(options);
};

/* 
 * Utility function that serializes
 * params
 */
var serialize = function(params) {
    var data = '';

    for (var key in params){
      if(params.hasOwnProperty(key)){
        var param = params[key];
        var type = param.toString();
        var value;

        if(data.length){
          data += '&';
        }

        switch(type) {
          case '[object Array]':
            value = (param[0].toString() === '[object Object]') ? JSON.stringify(param) : param.join(',');
            break;
          case '[object Object]':
            value = JSON.stringify(param);
            break;
          case '[object Date]':
            value = param.valueOf();
            break;
          default:
            value = param;
            break;
        }

        data += encodeURIComponent(key) + '=' + encodeURIComponent(value);
      }
    }

    return data;
};
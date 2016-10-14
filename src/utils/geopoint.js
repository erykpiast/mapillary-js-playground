/* eslint-disable */

// @source https://github.com/perfectline/geopoint

export default function GeoPoint (lon, lat) {
  switch (typeof (lon)) {

    case 'number':

      this.lonDeg = this.dec2deg(lon, this.MAX_LON);
      this.lonDec = lon;

      break;

    case 'string':

      if (this.decode(lon)) {
        this.lonDeg = lon;
      }

      this.lonDec = this.deg2dec(lon, this.MAX_LON);

      break;
  }

  switch (typeof (lat)) {

    case 'number':

      this.latDeg = this.dec2deg(lat, this.MAX_LAT);
      this.latDec = lat;

      break;

    case 'string':

      if (this.decode(lat)) {
        this.latDeg = lat;
      }

      this.latDec = this.deg2dec(lat, this.MAX_LAT);

      break;

  }
}

GeoPoint.prototype = {

  CHAR_DEG: '\u00B0',
  CHAR_MIN: '\u0027',
  CHAR_SEC: '\u0022',
  CHAR_SEP: '\u0020',

  MAX_LON: 180,
  MAX_LAT: 90,

    // decimal
  lonDec: NaN,
  latDec: NaN,

    // degrees
  lonDeg: NaN,
  latDeg: NaN,

  dec2deg(value, max) {
    const sign = value < 0 ? -1 : 1;

    const abs = Math.abs(Math.round(value * 1000000));

    if (abs > (max * 1000000)) {
      return NaN;
    }

    const dec = abs % 1000000 / 1000000;
    const deg = Math.floor(abs / 1000000) * sign;
    const min = Math.floor(dec * 60);
    const sec = (dec - min / 60) * 3600;

    let result = '';

    result += deg;
    result += this.CHAR_DEG;
    result += this.CHAR_SEP;
    result += min;
    result += this.CHAR_MIN;
    result += this.CHAR_SEP;
    result += sec.toFixed(2);
    result += this.CHAR_SEC;

    return result;
  },

  deg2dec(value) {
    const matches = this.decode(value);

    if (!matches) {
      return NaN;
    }

    const deg = parseFloat(matches[1]);
    const min = parseFloat(matches[2]);
    const sec = parseFloat(matches[3]);

    if (isNaN(deg) || isNaN(min) || isNaN(sec)) {
      return NaN;
    }

    return deg + (min / 60.0) + (sec / 3600);
  },

  decode(value) {
    let pattern = '';

        // deg
    pattern += '(-?\\d+)';
    pattern += this.CHAR_DEG;
    pattern += '\\s*';

        // min
    pattern += '(\\d+)';
    pattern += this.CHAR_MIN;
    pattern += '\\s*';

        // sec
    pattern += '(\\d+(?:\\.\\d+)?)';
    pattern += this.CHAR_SEC;

    return value.match(new RegExp(pattern));
  },

  getLonDec() {
    return this.lonDec;
  },

  getLatDec() {
    return this.latDec;
  },

  getLonDeg() {
    return this.lonDeg;
  },

  getLatDeg() {
    return this.latDeg;
  },

};

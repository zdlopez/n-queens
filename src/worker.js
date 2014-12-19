onconnect = function(e) {
  var port = e.ports[0];

  console.log('worker made');

  port.onmessage = function(e) {
    var ld = e.data[0];
    var cols = e.data[1];
    var rd = e.data[2];
    var n = e.data[3];
    var resultType = e.data[4];

    var all = Math.pow(2, n) - 1;
    var count = 0;

    var iterator = function(ld, cols, rd){
      if(cols === all){
        count++;
      }
      var pos = ~(ld | cols | rd) & all;
      while(pos){
        var bit = pos & -pos;
        pos -= bit;
        iterator((ld|bit)<<1, (cols|bit), (rd|bit)>>1);
      }
    }
    iterator(ld, cols, rd);


    port.postMessage([count, n]);
  }

  port.start();
}

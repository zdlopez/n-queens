window.countNQueensSolutionsBitwise = function (n) {
  var count = 0;
  var all = Math.pow(2, n) - 1;

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
  iterator(0,0,0);
  return count;
};


if (!!window.SharedWorker) {
  var myWorker = new SharedWorker("src/worker.js");

  myWorker.port.onmessage = function(e) {
    console.timeEnd('test');
    var n = e.data[1];
    var count = e.data[0];
    console.log('n queens solutions for n =', n, ':', count);
  }
}

myWorker.port.start();

(function () {
  var ld = 0;
  var rd = 0;
  var cols = 0;
  var n = 15;
  console.time('test');
  myWorker.port.postMessage([ld, cols, rd, n, 1]);
})();




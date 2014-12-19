// window.countNQueensSolutionsBitwise = function (n) {
  // var count = 0;
  // var all = Math.pow(2, n) - 1;

//   var iterator = function(ld, cols, rd){
//     if(cols === all){
//       count++;
//     }
//     var pos = ~(ld | cols | rd) & all;
//     while(pos){
//       var bit = pos & -pos;
//       pos -= bit;
//       iterator((ld|bit)<<1, (cols|bit), (rd|bit)>>1);
//     }
//   }
//   iterator(0,0,0);
//   return count;
// };

var n = 19;
var results = {
  count: 0,
  finished: 0,
  addCount: function(c) {
    this.count += c;
    console.log(this.count, 'solutions for', n, 'queens');
    console.timeEnd('test');
  }
}

// var myWorker = new SharedWorker("src/worker.js");
var parameters = [];
for(var i = 0; i < n; i++){
  var cols = 1 << i;
  var ld = cols << 1;
  var rd = cols >> 1;
  parameters.push([ld, cols, rd, n]);
}
//console.time('test');

  var workers = new Parallel(parameters);
  var nQueens = function(parameterSet){
    var cols = parameterSet[1];
    var ld = parameterSet[0];
    var rd = parameterSet[2];
    var n = parameterSet[3];
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
    iterator(ld,cols,rd);
    return count;
  }
  console.time('test');
  workers.map(nQueens).then(function(count){
    var sum = count.reduce(function(a,b){return a+b; });
    results.addCount(sum);
  });



//   myWorker.port.onmessage = function(e) {
//     console.timeEnd('test');
//     var n = e.data[1];
//     var count = e.data[0];
//     var resultsMsg = 'n queens solutions for n = ' + n + ': '  + count;
//     console.log(resultsMsg);
//     $('body').html(resultsMsg);
//   }
// }

// myWorker.port.start();

// (function () {
//   var ld = 0;
//   var rd = 0;
//   var cols = 0;
//   var n = 15;
//   console.time('test');
//   myWorker.port.postMessage([ld, cols, rd, n, 1]);
// })();




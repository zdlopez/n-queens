var makeSeeds = function (n) {
  var count = 0;
  var all = Math.pow(2, n) - 1;
  var maxDepth = 5;
  var seeds = [];

  var iterator = function(ld, cols, rd, currentDepth){
    if(currentDepth >= maxDepth){
      seeds.push([ld,cols, rd]);
      return;
    }
    var pos = ~(ld | cols | rd) & all;
    while(pos){
      var bit = pos & -pos;
      pos -= bit;
      iterator((ld|bit)<<1, (cols|bit), (rd|bit)>>1, currentDepth + 1);
    }
  }
  iterator(0,0,0,0);
  return seeds;
};

console.log(makeSeeds(26).length);

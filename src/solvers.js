/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  for (var i = 0; i < n; i++) {
    var row = board.get(i);
    row[i] = 1;
    board.set(i, row);
  }

  return board.getArray();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  for(var i = 1; i<=n; i++){
    solutionCount *= i;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.makeNQueensSolution = function(n) {
  var solution = undefined;
  var helper = [];
  var results = [];

  var testRow = function(helper){
    var currentRowSlots = [];
    // 0 is open, 1 is off-limits
    for(var i = 0; i < n; i++){
      currentRowSlots.push(0);
    }


    for (var row = 0; row < helper.length; row++ ){
      var col = helper[row];
      //set offlimits column based on previously occupied column
      currentRowSlots[col] = 1;
      var diff = helper.length - row;
      var left = col - diff;
      var right = col + diff;
      if(left >= 0){
        currentRowSlots[left] = 1;
      }
      if(right < n){
        currentRowSlots[right] = 1;
      }

    }

    //iterating through currentSlots to find the open positions and place the queens
    for (var i = 0; i < n; i++ ){
      if(currentRowSlots[i] === 0){
        if(helper.length < n-1){
          testRow(helper.concat(i));
        } else {
          return results.push(helper.concat(i));
        }
      }
    }

  };

  testRow(helper);

  return results;
};


window.findNQueensSolution = function(n) {

  var results = makeNQueensSolution(n);

  var makeBoardArrayFromHelper = function (helper) {
    var results = [];
    for (var i=0; i < n; i++) {
      var row = [];
      for (var j=0; j < n; j++) {
        if(j === helper[i]) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
      results.push(row);
    }
    return results;
  }

  if (results.length === 0) {
    solution = [];
    for (var i=0; i < n; i++) {
      solution.push([]);
    }
  } else {
    solution = makeBoardArrayFromHelper(results[0]);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var results = makeNQueensSolution(n);
  var solutionCount = results.length;

  if (n === 0 || n === 1) {
    solutionCount = 1;
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

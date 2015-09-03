function findMax(array){
  var max = 0;
  for (var i=0; i<array.length;i++){
    if (array[i] > max){
      max = array[i];
    }
  }
  return max;
}

function findMax(array){
  return Math.max(null, array);
}

//Call works by changing the context of the function that is applied. If I wrote a sayHello function for people type variables that said 'Hello,' + personName
//I could use call and change the context to a different place, like a cat for instance. sayHello.call(cat, catName) would output 
//'Hello' + catName\

Given two strings write a function maxSubstring that returns the longest substring that occurs in both strings.

example: maxSubstring('coding', 'imploding') => 'oding'

function maxSubstring(str1, str2){

}

function factorial(n){
  console.log(n);
  if (n==0){ return 1};
  return n * factorial(n-1);
}

function maxArray(array){
  max = arguments[1];
  if (array.length == 0) { return max }
  if (!max) { max = array[0] }
  else { max = array[0] > max ? array[0] : max }
  return maxInArray(array.slice(1), max)
}
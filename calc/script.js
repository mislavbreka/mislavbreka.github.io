
var obj = {
  x: '',
  y: '',
  z: '',
  op: ''
};

var input = document.getElementById('input');
var rules_out = document.getElementById('rules');
var result_out = document.getElementById('result');
var resultdata = [];
var ruledata = [];

input.addEventListener('keyup',function(e){
    input.value = input.value.toUpperCase();
    if (e.keyCode === 13) {
      if(input.value[0]=='?'){
        print2(result(input.value, ruledata), result_out);
      }else{
        print(getCombo(input.value), rules_out);
      }
      clearInput(input);
  }
});

function clearInput(x){
  x.value='';
}

function print(inputarray, location){
  location.innerHTML='';
  var temp='';
    for(var a = 0 ; a < inputarray.length ; a++){
      for(var b = 0 ; b < inputarray[a].length ; b++){
        var element = document.createElement("p");
        for(var c = 0 ; c < inputarray[a][b].length ; c++){
          temp+=inputarray[a][b][c];
        }
        var node = document.createTextNode(temp);
        temp='';
        element.appendChild(node);
        location.appendChild(element);
      }
    }
}
function print2(inputarray, location){
  location.innerHTML='';
  console.log(inputarray);
  var temp='';
    for(var a = 0 ; a < inputarray.length ; a++){
      var element = document.createElement("p");
      for(var b = 0 ; b < inputarray[a].length ; b++){
          temp+=inputarray[a][b];
        }
        var node = document.createTextNode(temp);
        temp='';
        element.appendChild(node);
        location.appendChild(element);
      }
    }


function rules(equation){
  
  if(equation.op==0){
    ruledata.push([]);
    ruledata[ruledata.length-1].push([equation.x, '=', equation.y, '+', equation.z]);
    ruledata[ruledata.length-1].push([equation.y, '=', equation.x, '-', equation.z]);
    ruledata[ruledata.length-1].push([equation.z, '=', equation.x, '-', equation.y]);
  }
  if(equation.op==1){
    ruledata.push([]);
    ruledata[ruledata.length-1].push([equation.x, '=', equation.y, '-', equation.z]);
    ruledata[ruledata.length-1].push([equation.y, '=', equation.x, '+', equation.z]);
    ruledata[ruledata.length-1].push([equation.z, '=', equation.y, '-', equation.x]);
  }
  if(equation.op==2){
    ruledata.push([]);
    ruledata[ruledata.length-1].push([equation.x, '=', equation.y, '*', equation.z]);
    ruledata[ruledata.length-1].push([equation.y, '=', equation.x, '/', equation.z]);
    ruledata[ruledata.length-1].push([equation.z, '=', equation.x, '/', equation.y]);
  }
  if(equation.op==3){
    ruledata.push([]);
    ruledata[ruledata.length-1].push([equation.x, '=', equation.y, '/', equation.z]);
    ruledata[ruledata.length-1].push([equation.y, '=', equation.x, '*', equation.z]);
    ruledata[ruledata.length-1].push([equation.z, '=', equation.y, '/', equation.x]);
  }
  return ruledata;
}

function AinB(a, b){
  for(var i = 0; i<b.length ; i++){
    if(b[i]==a){
      return true;
    }
  }
  return false;
}

function getCombo(input){
  var _temp = '';
  var openbracket = false;
  for(var i = 0 ; i<input.length ; i++){
    if(input.charAt(i)=='='){
      obj.x =_temp;
      _temp='';
    }
    else if(input.charAt(i)=='('){
      _temp+='(';
      openbracket=true;
    }
    else if(input.charAt(i)==')'){
      _temp+=')';
      openbracket=false;
    }
    else if(openbracket){
      _temp+=input.charAt(i);
      continue;
    }
    else if(input.charAt(i)=='+'){
      obj.y =_temp;
      obj.op = 0;
      _temp='';
    }
    else if(input.charAt(i)=='-'){
      obj.y =_temp;
      obj.op = 1;
      _temp='';

    }
    else if(input.charAt(i)=='*'){
      obj.y =_temp;
      obj.op = 2;
      _temp='';
    }
    else if(input.charAt(i)=='/'){
      obj.y =_temp;
      obj.op = 3;
      _temp='';
    }
    else{
      _temp+=input.charAt(i);
      if((i+1)==input.length){
        obj.z =_temp;
        _temp='';
      }
    }
  }
  return rules(obj);
}

function result(input, ruledata){
  input=input.substring(1);
  var temp = '';
  for(var a = 0 ; a < ruledata.length ; a++){
    for(var b = 0 ; b < ruledata[a].length ; b++){
        if(ruledata[a][b][0]==input){
          for(var c = 0 ; c < ruledata.length ; c++){
            for(var d = 0 ; d < ruledata[c].length ; d++){
              /** in future add loop here for more than two val */
              if(AinB(ruledata[a][b][0],ruledata[c][d]) & AinB(ruledata[a][b][2],ruledata[c][d]) & AinB(ruledata[a][b][4],ruledata[c][d]) ){
                continue;
              }
              if(ruledata[a][b][2]==ruledata[c][d][0]){
                temp = [ruledata[a][b][0], ruledata[a][b][1],'(',ruledata[c][d][2],ruledata[c][d][3],ruledata[c][d][4],')',ruledata[a][b][3],ruledata[a][b][4]];
                resultdata.push(temp);
                temp='';
              }
              if(ruledata[a][b][4]==ruledata[c][d][0]){
                temp = [ruledata[a][b][0], ruledata[a][b][1], ruledata[a][b][2], ruledata[a][b][3],'(',ruledata[c][d][2],ruledata[c][d][3],ruledata[c][d][4],')'];
                resultdata.push(temp);
                temp='';
              }
              
            }
          }
      }
    }
  }
  
  
  console.log(resultdata);
  return resultdata;
}
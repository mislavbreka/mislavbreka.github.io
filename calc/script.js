
var obj = {
  x: '',
  y: '',
  z: '',
  op: ''
};

var input = document.getElementById('input');
var output = document.getElementById('result');
var output0 = document.getElementById('endresult');
var indata = [];
var outdata = [];
var outdata0 = [];

input.addEventListener('keyup',function(e){
    input.value = input.value.toUpperCase();
    if (e.keyCode === 13) {
      if(input.value[input.value.length-1]=='?'){
        join(input.value);
      }else{
      var temp = verify(input.value);
      indata.push(temp[0]);
      input.value='';
      
      reverse();
      
    }
    updateList();
      console.log(outdata);
  }
});

function updateList(){
  output.innerHTML='';
  var _temp='';
  for(var i = 0 ; i < outdata.length ; i++){
    var element = document.createElement("p");
    for(j = 0; j<outdata[i].length ; j++){
      _temp+=outdata[i][j];
    }
    var node = document.createTextNode(_temp);
    _temp='';
    element.appendChild(node);
    output.appendChild(element);
  }

  output0.innerHTML='';
  var _temp='';
  for(var i = 0 ; i < outdata0.length ; i++){
    var element = document.createElement("p");
    for(j = 0; j<outdata0[i].length ; j++){
      _temp+=outdata0[i][j];
    }
    var node = document.createTextNode(_temp);
    _temp='';
    element.appendChild(node);
    output0.appendChild(element);
  }
}

function reverse(){
  var _temp = [obj.x, obj.y, obj.z];
  
  if(obj.op==0){
    outdata.push([obj.x, '=', obj.y, '+', obj.z]);
    outdata.push([obj.y, '=', obj.x, '-', obj.z]);
    outdata.push([obj.z, '=', obj.x, '-', obj.y]);
  }
  if(obj.op==1){
    outdata.push([obj.x, '=', obj.y, '-', obj.z]);
    outdata.push([obj.y, '=', obj.x, '+', obj.z]);
    outdata.push([obj.z, '=', obj.y, '-', obj.x]);
  }
  if(obj.op==2){
    outdata.push([obj.x, '=', obj.y, '*', obj.z]);
    outdata.push([obj.y, '=', obj.x, '/', obj.z]);
    outdata.push([obj.z, '=', obj.x, '/', obj.y]);
  }
  if(obj.op==3){
    outdata.push([obj.x, '=', obj.y, '/', obj.z]);
    outdata.push([obj.y, '=', obj.x, '*', obj.z]);
    outdata.push([obj.z, '=', obj.y, '/', obj.x]);
  }
  
}

function AinB(a, b){
  for(var i = 0; i<b.length ; i++){
    if(b[i]==a){
      return true;
    }
  }
  return false;
}

function verify(input){
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
  
  return [input];
}

function join(x){
  x=x.slice(0, -1);
  var _temp = '';
  for(var i = 0 ; i < outdata.length ; i++){
    if(outdata[i][0]==x){
      for(var j = 0 ; j < outdata.length ; j++){
        if(AinB(outdata[i][0],outdata[j]) & AinB(outdata[i][2],outdata[j]) & AinB(outdata[i][4],outdata[j]) ){
          continue;
        }
        if(outdata[i][2]==outdata[j][0]){
          _temp = outdata[i][0].concat(outdata[i][1],'(',outdata[j][2],outdata[j][3],outdata[j][4],')',outdata[i][3],outdata[i][4]);
          outdata0.push(_temp);
          temp='';
        }
        if(outdata[i][4]==outdata[j][0]){
          _temp = outdata[i][0].concat(outdata[i][1],outdata[i][2] ,outdata[i][3],'(',outdata[j][2],outdata[j][3],outdata[j][4],')');
          outdata0.push(_temp);
          temp='';
        }
      }
      
      break;
    }
  }
}
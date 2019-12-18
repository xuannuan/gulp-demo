(function(){
var lis=document.querySelectorAll('li');
var ul=document.querySelectorAll('ul')[0];

for(let i=0;i<lis.length;i++){
	ul.appendChild('<li>'+lis[i]+'</li>');
}
})()
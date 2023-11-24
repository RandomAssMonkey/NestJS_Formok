/* eslint-disable prettier/prettier */
function init(){
  document.getElementById('submit').addEventListener('click', previousInput)
  document.getElementById('form').addEventListener('submit', loadPreviousInput);
}
function loadPreviousInput(){
  
}
/*function previousInput(){
  const serialNumber = document.getElementById('serialNumber').value;
  const name = document.getElementById('name').value;
  const condition = document.getElementById('condition').value;
  
}*/
document.addEventListener('DOMContentLoaded', init);

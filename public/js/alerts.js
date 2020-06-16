let alert_div = document.querySelector('.alert');
let alert_close = document.querySelector('.close');

alert_close.addEventListener('click', function()
{
    alert_div.style.display = 'none';
});
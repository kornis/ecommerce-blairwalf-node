let bars = document.querySelector(".fa-bars");
let menu = document.querySelector(".menu");
let form =  document.querySelector(".form");
if(form != null)
{
    let formInputs = Array.from(form.elements);
    formInputs.shift();
    formInputs.pop();

    form.addEventListener('submit', function(e)
    {
        formInputs.forEach(oneInput =>
            {
             
            if(oneInput.value == "")
            {
                oneInput.nextElementSibling.innerHTML = `El campo ${oneInput.dataset.name} es obligatorio`;
                oneInput.classList.add('is-invalid')
                e.preventDefault();
            }
            else
            {
                oneInput.classList.remove('is-invalid')
                oneInput.nextElementSibling.innerHTML = "";
            }
        })
    }); 
} 


bars.addEventListener("click",function() 
{
    if(!menu.getAttribute("style"))
    {
        menu.setAttribute("style","max-height:500px;transition: max-height 0.5s ease-out")
    }
    else
    {
        menu.removeAttribute("style");
    }
    
})

       

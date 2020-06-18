window.onload = function()
{
    let form = document.getElementById("formulario");   
    let inputs = Array.from(form.elements);
    let empty_form = document.querySelector('.empty-form');
    let errores = {};
    inputs.pop();
    inputs.pop();
    
    inputs.forEach(oneInput =>
        {
            oneInput.addEventListener('blur', function()
            {
                let value = this.value;
                if(validator.isEmpty(value, {ignore_whitespace: true}))
                {
                    oneInput.classList.add('invalid');
                    oneInput.nextElementSibling.innerHTML = `El campo ${this.dataset.name} está vacío.`;
                    errores[this.name] = true;
                }
                else
                {
                    if(oneInput.dataset.name == "Email")
                    {
                        if(validator.isEmail(oneInput.value, {ignore_whitespace: true}))
                        {
                            oneInput.classList.remove('invalid');
                            oneInput.nextElementSibling.innerHTML = "";
                            delete errores[this.name];
                            return true;
                        }
                        else
                        {
                            oneInput.classList.add('invalid');
                            oneInput.nextElementSibling.innerHTML = `El campo ${this.dataset.name} debe ser un email válido.`;
                            errores[this.name] = true;
                            return false;
                        }
                    }
                    oneInput.classList.remove('invalid');
                    oneInput.nextElementSibling.innerHTML = "";
                    delete errores[this.name];
                }

            })
        });

        form.addEventListener('submit', function(e){
            inputs.forEach(oneInput =>
                {
                    if(validator.isEmpty(oneInput.value, {ignore_whitespace: true}))
                    {
                        oneInput.classList.add('invalid');
                        oneInput.nextElementSibling.innerHTML = `El campo ${oneInput.dataset.name} es obligatorio.`;
                        errores[this.name] = true;
                    }
                });
                if(Object.keys(errores).length > 0)
                {
                    e.preventDefault();
                    empty_form.innerHTML = "Uno o mas campos tiene errores";
                }

        })
}

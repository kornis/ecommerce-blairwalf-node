window.onload = function()
{
    let form = document.getElementById("formulario");   
    let inputs = Array.from(form.elements);
    let empty_form = document.querySelector('.empty-form');
    let errores = {};
    inputs.pop();
    
    inputs.forEach(oneInput =>
        {
            oneInput.addEventListener('blur', function()
            {
                console.log(errores)
                if(Object.keys(errores).length == false || Object.keys(errores).length == 0 )
                {
                    
                    empty_form.innerHTML = "";
                }

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
                    if(oneInput.dataset.name == "Repetir Contraseña")
                    {
                        let pass = document.getElementById('pass');
                        if(oneInput.value != pass.value)
                        {
                            oneInput.classList.add('invalid');
                            oneInput.nextElementSibling.innerHTML = `La contraseña no coincide.`;
                            errores[oneInput.name] = true;
                            pass.classList.add('invalid');
                            errores[pass.name] = true;
                            return false;
                        }
                        else
                        {
                            oneInput.classList.remove('invalid');
                            oneInput.nextElementSibling.innerHTML = "";
                            delete errores[oneInput.name];
                            pass.classList.remove('invalid');
                            delete errores[pass.name];
                            return true;
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
                        errores[oneInput.name] = true;
                    }
                });
                if(Object.keys(errores).length > 0)
                {
                    e.preventDefault();
                    empty_form.innerHTML = "Uno o mas campos tiene errores";
                }

        })
}

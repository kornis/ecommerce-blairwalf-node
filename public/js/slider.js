let imagen = document.querySelectorAll(".mySlide");
let flechas = document.querySelectorAll(".flecha");

imagen[0].style.display = "block";
console.log(imagen.length)

flechas.forEach(unaFlecha => {
    unaFlecha.addEventListener("click", function(){

        for(let i = 0; i < imagen.length; i++)
        {
            if(imagen[i].getAttribute("style") == "display: block;")
            {
                
                imagen[i].style.display =  "none";
                if(i === imagen.length-1)
                {
                    i = 0;
                    imagen[i].style.display = "block";
                    console.log("valor de i= "+i)
                }
                else
                {
                    imagen[i+1].style.display = "block";
                }
                
                break;
            }
        }
    })
})




function izquierda()
{
    
}

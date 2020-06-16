let tarjeta = document.querySelectorAll(".tarjeta-item");
let botones = document.querySelectorAll(".boton-slider");

let slideItem = 0;

function hideSlide(val)
{
    tarjeta[val].className = tarjeta[val].className.replace("show-tarjeta","hide-tarjeta");
    botones[val].className = botones[val].className.replace("fas","far")
}

for(let i = 0; i<tarjeta.length;i++)
    {
        botones[i].addEventListener("click",function(boton)
        {
            hideSlide(slideItem);
           slideItem = i;
           tarjeta[i].className = tarjeta[i].className.replace("hide-tarjeta","show-tarjeta");
           botones[i].className = botones[i].className.replace("far","fas")
        })
    }
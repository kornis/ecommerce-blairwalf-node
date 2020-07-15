let talle = document.querySelectorAll(".item-talle");

let talle_selected = 0;

function select_talle(val)
{
    change_color(val);
}


function change_color(val)
{
    for(let i = 0; i<talle.length;i++)
    {
        if(i == val)
        {
            talle[i].style.backgroundColor = "#f6c2ce";
        }
        else
        {
            talle[i].style.backgroundColor = "white";
        }
    }
}


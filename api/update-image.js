let submit = document.getElementById('submit-update');
let lightbox = document.getElementById('lbox');
const csrfToken = document.querySelector("[name~=_token]");
let formData = new FormData();



function close_panel()
{
    lightbox.style.display = "none";
    getElement().nextElementSibling.classList.add('hidden');
}

function startUpdate(id)
{
    lightbox.style.display = 'flex';

    submit.addEventListener('click', function(e)
    {

        let file = getElement();
        if(file.files[0]==undefined)
        {
            file.nextElementSibling.classList.remove("hidden");
        }
        else {
            file.nextElementSibling.classList.add("hidden");
            formData.append('file',file.files[0]);
            formData.append('_token',csrfToken);
            formData.append('previous_id',id);
            let request = new Request('/api/admin/actualizar-imagen',
            {
                method: 'post',
                body: formData,
            });
            fetch(request)
            .then(data => data.json())
            .then(result => console.log(result))
            .catch(e => console.log(e));
        }
    })
}

function getElement() 
{
    return document.getElementById('updateImage');
}
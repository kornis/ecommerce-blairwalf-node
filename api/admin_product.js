let delete_button = document.querySelectorAll('.delete_item');
let item_box = document.querySelectorAll('.product-detail-content');
const csrfToken = document.querySelector("[name~=_token]").value;
delete_button.forEach((item,i) =>
    {
        item.addEventListener('click', function()
        {
            delete_product(item.dataset.name,item_box[i]);
        })
    })

function delete_product(id_item, item)
{
  
    let url = '/admin/borrar-producto';
    let data = {
        product_id: id_item,
    };
    fetch(url,
        {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'content-type' : 'application/json',
                "X-CSRF-Token": csrfToken
            }
        })
        .then(result => result.json())
        .then(response =>
            {
                if(response.status_code == "200")
                {
                    hideDiv(item);
                    console.log(response);
                }
            })
        .catch(error => console.log(error));
    
}

function hideDiv(div)
{
    div.style.display = 'none';
}


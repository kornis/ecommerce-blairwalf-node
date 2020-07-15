
document.getElementById('updateImage').onchange = function(e)
{
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0])
    reader.onload = function()
    {
        let preview = document.getElementById("image-preview");
        preview.src = reader.result;
    }
}
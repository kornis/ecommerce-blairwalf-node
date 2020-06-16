module.exports = 
{
    findEmail:async (db,email) =>
    {
       let result = await db.findOne({where:
        {
            email: email,
        }})
        return result;
        /*.then(result =>
            {
                if(result)
                {
                    return "mi email creado";
                }
                else
                {
                    return "mi email no creado";
                }
            })*/
    } 
}
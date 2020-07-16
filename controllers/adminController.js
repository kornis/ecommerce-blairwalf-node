const db = require('../database/models');

module.exports = {
    //categories
    indexCategory: (req,res) => {
        db.category.findAll()
        .then(result => {
            if(result)
            {
                return res.render('admin/category/index', {
                    message:req.query.ok,
                    message_error:req.query.err,
                    categories: result,
                });
            }
            else{
                return res.send("crear pagina principal de admin");
            }
        })
        .catch(error => {
            console.error(error);
            return res.send("crear pagina principal de admin");
        })
    },
    createCategory: (req,res) => {
        //using the same form to edit and create category.
        //specific urlForm and method to distinguish views
        return res.render('admin/category/form',{
            urlForm: '',
            method: 'POST',
            message: req.query.ok,
            message_error: req.query.err,
        });
    },
    storeCategory: (req,res) => {
        db.category.create(req.body)
        .then(result => {
            if(result){
                return res.redirect('/admin/categorias?ok=Producto creado con éxito.');
            }
            else{
                return res.redirect('/admin/categorias?err=Error al cargar la categoría');
            }
        })
        .catch(error => {
            console.error(error);
            //check if it's a duplicated entry
            if(error.name == 'SequelizeUniqueConstraintError'){
                return res.redirect('/admin/categorias?err=Categoría ya existe');
            }
            //unknown error
            return res.redirect('/admin/categorias?err=Error al cargar la categoría');
        });
    },
    editCategory: (req,res) => {
       //using the same form to edit and create category.
        //specific urlForm and method to distinguish views
        return res.render('admin/category/form',{
            urlForm: '?_method=PUT',
            method: 'PUT',
            message: req.query.ok,
            message_error: req.query.err,
        });
    },
    updateCategory: (req,res) => {
        let id = req.params.id;
        db.category.update(req.body,{where:{id:id}})
        .then(result => {
            if(result){
                return res.redirect('/admin/categorias?ok=Categoría modificada con éxito.');
            }
            else{
                return res.redirect(`/admin/categoria/${id}?err=Error al modificar la categoría`);
            }
        })
        .catch(error => {
            console.error(error);
            //check if it's a duplicated entry
            if(error.name == 'SequelizeUniqueConstraintError'){
                return res.redirect('/admin/categoria/${id}?err=Categoría ya existe');
            }
            //unknown error
            return res.redirect('/admin/categoria/${id}?err=Error al modificar la categoría');
        });
     },
    deleteCategory: (req,res) => {
        let id = req.params.id;
        db.category.destroy({where:{id:id}})
        .then(result => {
            return res.redirect('/admin/categorias?ok=Eliminado con éxito.');
        })
        .catch(error => {
            console.error(error);
            return res.redirect('/admin/categorias?err=Error inesperado.');
        })
    },

    //brands
    createBrands: (req,res) => {
        res.render('admin/create_brand');
    },

    editBrands: (req,res) => {
        res.render('admin/edit_brand');
    },

    createProducts: (req,res) => {
        res.render('admin/create_product');
    },

    editProducts: (req,res) => {
        res.render('admin/edit_product');
    },

    createProviders: (req,res) => {
        res.render('admin/create_provider');
    },

    editProviders: (req,res) => {
        res.render('admin/edit_provider');
    },

    createSizes: (req,res) => {
        res.render('admin/create_size');
    },

    editSizes: (req,res) => {
        res.render('admin/edit_size');
    },
}
const db = require('../database/models');

module.exports = {
    //categories
    indexCategory: (req, res) => {
        db.category.findAll()
            .then(result => {
                if (result) {
                    return res.render('admin/category/index', {
                        message: req.query.ok,
                        message_error: req.query.err,
                        categories: result,
                    });
                }
                else {
                    return res.render('admin/category/index');
                }
            })
            .catch(error => {
                console.error(error);
                return res.redirect('/admin/dashboard?err=Error inesperado');
            })
    },
    createCategory: (req, res) => {
        //using the same form to edit and create category.
        //specific urlForm to distinguish views
        //we are sending an empty object to avoid problems with variables in front
        return res.render('admin/category/form', {
            urlForm: '',
            title: 'Crear categoría',
            message: req.query.ok,
            message_error: req.query.err,
            category: {}
        });
    },
    storeCategory: (req, res) => {
        db.category.create(req.body)
            .then(result => {
                if (result) {
                    return res.redirect('/admin/categorias?ok=Producto creado con éxito.');
                }
                else {
                    return res.redirect('/admin/categorias?err=Error al cargar la categoría');
                }
            })
            .catch(error => {
                console.error(error);
                //check if it's a duplicated entry
                if (error.name == 'SequelizeUniqueConstraintError') {
                    return res.redirect('/admin/categorias?err=Categoría ya existe');
                }
                //unknown error
                return res.redirect('/admin/categorias?err=Error al cargar la categoría');
            });
    },
    editCategory: (req, res) => {
        db.category.findByPk(req.params.id)
            .then(result => {
                if (result) {
                    //using the same form to edit and create category.
                    //specific urlForm to distinguish views
                    return res.render('admin/category/form', {
                        urlForm: '?_method=PUT',
                        title: 'Modificar categoría',
                        message: req.query.ok,
                        message_error: req.query.err,
                        category: result,
                    });
                }
                else {
                    return res.redirect('/admin/categorias?err=Categoría no encontrada');
                }
            })
            .catch(error => {
                console.error(error);
                return res.redirect('/admin/categorias?err=Error inesperado');
            });
    },
    updateCategory: (req, res) => {
        let id = req.params.id;
        db.category.update(req.body, { where: { id: id } })
            .then(result => {
                if (result) {
                    return res.redirect('/admin/categorias?ok=Categoría modificada con éxito.');
                }
                else {
                    return res.redirect(`/admin/categoria/${id}?err=Error al modificar la categoría`);
                }
            })
            .catch(error => {
                console.error(error);
                //check if it's a duplicated entry
                if (error.name == 'SequelizeUniqueConstraintError') {
                    return res.redirect('/admin/categoria/${id}?err=Categoría ya existe');
                }
                //unknown error
                return res.redirect('/admin/categoria/${id}?err=Error al modificar la categoría');
            });
    },
    deleteCategory: (req, res) => {
        let id = req.params.id;
        db.category.destroy({ where: { id: id } })
            .then(result => {
                return res.redirect('/admin/categorias?ok=Eliminado con éxito.');
            })
            .catch(error => {
                console.error(error);
                return res.redirect('/admin/categorias?err=Error inesperado.');
            })
    },

    //brands
    indexBrand: (req, res) => {
        db.brand.findAll()
            .then(result => {
                if (result) {
                    return res.render('admin/brand/index', {
                        brands: result
                    });
                }
                else {
                    return res.render('admin/brand/index');
                }
            })
            .catch(error => {
                console.error(error);
                return res.redirect('/admin/dashboard?err=Error inesperado');
            })
    },
    createBrand: (req, res) => {
        //we are sending an empty object to avoid problems with variables in front
        //using the same form to edit and create brand.
        //specific urlForm and method to distinguish views
        return res.render('admin/brand/form', {
            urlForm: '',
            title: 'Crear marca',
            message: req.query.ok,
            message_error: req.query.err,
            brand: {}
        });
    },
    storeBrand: (req, res) => {
        db.brand.create(req.body)
            .then(result => {
                if (result) {
                    return res.redirect('/admin/marca?ok=Marca creada con éxito.');
                }
            })
            .catch(error => {
                console.error(error);
                //validate if entry exists
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return res.redirect('/admin/marca?err=La marca ya existe.');
                }
                return res.redirect('/admin/marcas?err=Error inesperado.');
            })
    },
    editBrand: (req, res) => {
        //using the same form to edit and create brand.
        //specific urlForm to distinguish views
        db.brand.findByPk(req.params.id)
            .then(result => {
                if (result) {
                    return res.render('admin/brand/form', {
                        urlForm: '?_method=PUT',
                        title: 'Modificar marca',
                        message: req.query.ok,
                        message_error: req.query.err,
                        brand: result
                    });
                }
                else {
                    return res.redirect('/admin/marcas?err=Marca no encontrada');
                }
            })
            .catch(error => {
                console.error(error);
                return res.redirect('/admin/marcas?err=Error inesperado');
            })
    },
    updateBrand: (req, res) => {
        const id = req.params.id;
        db.brand.update(req.body, { where: { id: id } })
            .then(result => {
                if (result) {
                    return res.redirect('/admin/marcas?ok=Marca modificada con éxito.');
                }
            })
            .catch(error => {
                console.error(error);
                //validate if entry exists
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return res.redirect(`/admin/marca/${id}?err=La marca ya existe.`);
                }
                return res.redirect('/admin/marcas?err=Error inesperado');
            })
    },
    deleteBrand: (req, res) => {
        db.brand.destroy({ where: { id: req.params.id } })
            .then(result => {
                if (result) {
                    return res.redirect('/admin/marcas?ok=Marca eliminada con éxito.');
                }
            })
            .catch(error => {
                console.error(error);
                return res.redirect('/admin/marcas?err=Error inesperado.');
            });
    },



    indexProvider: (req, res) => {
        db.provider.findAll()
            .then(result => {
                if (result) {
                    return res.render('admin/provider/index', {
                        providers: result,
                    });
                }
                else {
                    return res.render('admin/provider/index');
                }
            })
            .catch(error => {
                console.error(error);
                return res.redirect('/admin/dashboard?err=Error inesperado');
            })
    },
    createProvider: (req, res) => {
        //using the same form to edit and create provider.
        //specific urlForm to distinguish views
        return res.render('admin/provider/form', {
            urlForm: '',
            message: req.query.ok,
            message_error: req.query.err,
            provider: {}
        });
    },
    storeProvider: (req, res) => {
        db.provider.create(req.body)
            .then(result => {
                if (result) {
                    return res.redirect('/admin/providers?ok=Proveedor creado con éxito.');
                }
                else {
                    return res.redirect('/admin/proveedor?err=Error inesperado');
                }
            })
            .catch(error => {
                console.error(error);
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return res.redirect('/admin/proveedor?err=Proveedor ya existente.');
                }
                return res.redirect('/admin/proveedores?err=Error inesperado.');
            })
    },
    editProvider: (req, res) => {
        //using the same form to edit and create provider.
        //specific urlForm to distinguish views
        db.provider.findByPk(req.params.id)
            .then(result => {
                if (result) {
                    return res.render('admin/provider/form', {
                        urlForm: '?_method=PUT',
                        title: 'Modificar proveedor',
                        message: req.query.ok,
                        message_error: req.query.err,
                        provider: result
                    });
                }
                else {
                    return res.redirect('/admin/proveedores?err=Proveedor no encontrado');
                }
            })
            .catch(error => {
                console.error(error);
                return res.redirect('/admin/proveedores?err=Error inesperado');
            })
    },
    updateProvider: (req, res) => {
        const id = req.params.id;
        db.provider.update(req.body, { where: { id: id } })
            .then(result => {
                if (result) {
                    return res.redirect('/admin/providers?ok=Proveedor modificado con éxito.');
                }
            })
            .catch(error => {
                console.error(error);
                //validate if entry exists
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return res.redirect(`/admin/proveedor/${id}?err=El proveedor ya existe.`);
                }
                return res.redirect('/admin/proveedores?err=Error inesperado');
            })
    },
    deleteProvider: (req, res) => {
        db.provider.destroy({ where: { id: req.params.id } })
            .then(result => {
                if (result) {
                    return res.redirect('/admin/proveedores?ok=Proveedor eliminado con éxito.');
                }
            })
            .catch(error => {
                console.error(error);
                return res.redirect('/admin/proveedores?err=Error inesperado.');
            });
    },





    createSizes: (req, res) => {
        res.render('admin/create_size');
    },

    editSizes: (req, res) => {
        res.render('admin/edit_size');
    },
    createProducts: (req, res) => {
        res.render('admin/create_product');
    },

    editProducts: (req, res) => {
        res.render('admin/edit_product');
    },
}
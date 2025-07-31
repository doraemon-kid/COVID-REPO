var router = require('express').Router()
var appHandler = require('../core/appHandler')
var authHandler = require('../core/authHandler')
var rateLimit = require('express-rate-limit')

// Define rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})

module.exports = function () {
    router.get('/', authHandler.isAuthenticated, function (req, res) {
        res.redirect('/learn')
    })

    router.get('/usersearch', authHandler.isAuthenticated, limiter, function (req, res) {
        res.render('app/usersearch', {
            output: null
        })
    })

    router.get('/ping', authHandler.isAuthenticated, limiter, function (req, res) {
        res.render('app/ping', {
            output: null
        })
    })

    router.get('/bulkproducts', authHandler.isAuthenticated, limiter, function (req, res) {
        res.render('app/bulkproducts',{legacy:req.query.legacy})
    })

    router.get('/products', authHandler.isAuthenticated, appHandler.listProducts)

    router.get('/modifyproduct', authHandler.isAuthenticated, appHandler.modifyProduct)

    router.get('/useredit', authHandler.isAuthenticated, appHandler.userEdit)

    router.get('/calc', authHandler.isAuthenticated, limiter, function (req, res) {
        res.render('app/calc',{output:null})
    })

    router.get('/admin', authHandler.isAuthenticated, function (req, res) {
        res.render('app/admin', {
            admin: (req.user.role == 'admin')
        })
    })

    router.get('/admin/usersapi', authHandler.isAuthenticated, appHandler.listUsersAPI)

    router.get('/admin/users', authHandler.isAuthenticated, function(req, res){
        res.render('app/adminusers')
    })

    router.get('/redirect', appHandler.redirect)

    router.post('/usersearch', authHandler.isAuthenticated, limiter, appHandler.userSearch)

    router.post('/ping', authHandler.isAuthenticated, limiter, appHandler.ping)

    router.post('/products', authHandler.isAuthenticated, appHandler.productSearch)

    router.post('/modifyproduct', authHandler.isAuthenticated, appHandler.modifyProductSubmit)

    router.post('/useredit', authHandler.isAuthenticated, appHandler.userEditSubmit)

    router.post('/calc', authHandler.isAuthenticated, limiter, appHandler.calc)

    router.post('/bulkproducts',authHandler.isAuthenticated, limiter, appHandler.bulkProducts);

    router.post('/bulkproductslegacy',authHandler.isAuthenticated, limiter, appHandler.bulkProductsLegacy);

    return router
}

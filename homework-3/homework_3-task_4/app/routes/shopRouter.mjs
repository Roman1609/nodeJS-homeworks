import { Router } from 'express'

const shopRouter = Router()

shopRouter.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add product',
        name: 'product name',
        value: 'prod value',
        price: 'prod price'
    })
})
shopRouter.get('/products', (req, res) => {

    const products = [
        { name: 'product 1', price: 100, value: 20 },
        { name: 'product 2', price: 50, value: 10 },
        { name: 'product 3', price: 30, value: 5 },
        { name: 'product 4', price: 200, value: 3}
    ]
    res.render('products', {products})
})
shopRouter.get('/main', (req, res) => {
    res.render('main', {
        pageProducts: "See our Products",
        pageAdd: "Add some product",
        pageAbout: "Something interesting"
    });
});

export default shopRouter
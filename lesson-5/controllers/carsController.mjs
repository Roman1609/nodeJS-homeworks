import CarModel from "../models/carModel.mjs";

class CarsController {
    static getHomePage(req, res) {
        try {
            const cars = CarModel.loadCarsList();
            res.render('home', {
            cars
        });
        } catch (error) {
           throw new Error('Error in Cars.getHomePage:', error);
        }
    }
    static getAboutPage(req, res) {
        try {
            res.render('about')
        } catch (error) {
            throw new Error('Error in Cars.getAboutPage:', error);
        }
    }
    static createAddingForm(req, res) {
        try {
            res.render('addCarForm')
        } catch (error) {
            throw new Error('Error in Cars.createAddingForm:', error);
        }
    }
    static addNewCarToList(req, res) {
        try {
            const carData = {
                imageSrc: req.file.filename, ...req.body
            }
            CarModel.addCar(carData)
            res.redirect('/cars/home');
        } catch (error) {
            console.error('Error in Cars.addNewCarToList:', error);
        }
    }
}


export default CarsController;
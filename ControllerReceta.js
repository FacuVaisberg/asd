import { Router } from "express";

import Receta from "./services/Recetas-service.js";
import RecetaService from "./services/Recetas-service.js";

const router = Router();

router.get('', async (req, res) => {
    let svc = new RecetaService();
    let receta = await svc.getAll();
    res.send(receta);
    console.log("estoy en el get de receta")
})

router.delete(':id', async (req, res) => {
    let svc = new RecetaService();
    let receta = await svc.deleteById(req.params.id);
    res.send(receta);



})

router.put('/api/receta/:id', async(req, res) => {
    let cuerpo = req.body;
    console.log('estoy en Update');
    try{
        let svc = new RecetaService();
        let receta  = await svc.update(cuerpo, req.params.id);
        res.send(receta);
    } catch(error){
        console.log(error);
        res.send("error");

    }
})

router.post('/api/receta/', async(req, res) => {
    let  cuerpo = req.body;
    console.log(cuerpo);
    try{
        let svc = new RecetaService();
    let receta  = await svc.insert(cuerpo);
    res.send(receta);}
    catch(error)
    {
        res.send("error");

    }
})

export default router;
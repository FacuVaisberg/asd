import { Router } from "express";
import UsuarioService from "./services/Usuario-service.js";
import { Authenticate } from "./common/jwt.strategy.js";

const router = Router();

router.get('/', Authenticate, async (req, res) => {
    let svc = new UsuarioService();
    let usuario = await svc.getAll();
    res.send(usuario);
    console.log("estoy en el get")
})

router.delete('/:id', Authenticate, async (req, res) => {
    let svc = new UsuarioService();
    console.log(req.params.id);
    let usuario = await svc.deleteById(req.params.id);

    res.send(usuario);



})

router.put('/:id', Authenticate,  async(req, res) => {
    let cuerpo = req.body;
    console.log('estoy en Update');
    try{
        let svc = new UsuarioService();
        let usuario  = await svc.update(cuerpo, req.params.id);
        res.send(usuario);
    } catch(error){
        console.log(error);
        res.send("error");

    }
})

router.post('/Farmacia/', Authenticate, async(req, res) => {
    let  cuerpo = req.body;
    console.log(cuerpo);
    try{
        let svc = new UsuarioService();
    let usuario  = await svc.insertFarmacia(cuerpo);
    res.send(usuario);}
    catch(error)
    {
        res.send("error");
    }
})

router.post('/Medico/', Authenticate, async(req, res) => {
    let  cuerpo = req.body;
    console.log(cuerpo);
    try{
        let svc = new UsuarioService();
        console.log("despues de usuarioservice");
        let usuario  = await svc.insertMedico(cuerpo);
        res.send(usuario);
    }
    catch(error)
    {
        res.send("error");
    }
})

router.post('/Paciente/', Authenticate, async(req, res) => {
    let  cuerpo = req.body;
    console.log(cuerpo);
    try{
        let svc = new UsuarioService();
    let usuario  = await svc.insertPaciente(cuerpo);
    res.send(usuario);}
    catch(error)
    {
        res.send("error");
    }
})

export default router;


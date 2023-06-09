import config from "../dbconfig.js";
import sql from 'mssql';


export default class UsuarioService
    {
        getAll = async ()=> {
            let returnEntity = null;
            console.log('Estoy en: UsuarioService.GetAll');
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                .query('select * from Usuario');
                returnEntity = result.recordsets[0];
            } catch (error) {
                console.log(error)
            }
            return returnEntity;
        }
    insertFarmacia = async (usuario) => {
        let rowsAffected = null;
        console.log('Estoy en: UsuarioService.insert(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pApellido' , sql.Text, usuario.apellido)
            .input('pTelefono' , sql.Int, usuario.Telefono)
            .input('pMail' , sql.Text, usuario.Mail)
            .input('pContraseña' , sql.Text, usuario.Contraseña)
            .input('pNombre' , sql.Text, usuario.Nombre)
            .query('insert into Usuario(Apellido, Telefono, Mail, Contraseña, Nombre) VALUES (@pApellido, @pTelefono, @pMail, @pContraseña, @pNombre)')

            result = await pool.request()
            .query('select max(IdUsuario) as UltimoId from Usuario');
            let max = result.recordsets[0].UltimoId;

            result = await pool.request()
            .input('pIdUsuario' , sql.Int, max)
            .input('pNombreDueño' , sql.Text, usuario.NombreDueño)
            .input('pDireccion' , sql.Int, usuario.Direccion)
            .query('insert into Farmacia(IdUsuario, NombreDueño, Direccion) VALUES (@pIdUsuario, @pNombreDueño, @pDireccion)');            
            rowsAffected = result.rowsAffected;    
        } catch (error) {
            console.log(error); 
        }
        return rowsAffected;
    }

    insertMedico = async (usuario) => {
        let rowsAffected = null;
        console.log('Estoy en: UsuarioService.insert(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pApellido' , sql.Text, usuario.Apellido)
            .input('pTelefono' , sql.Int, usuario.Telefono)
            .input('pMail' , sql.Text, usuario.Mail)
            .input('pContraseña' , sql.Text, usuario.Contraseña)
            .input('pNombre' , sql.Text, usuario.Nombre)
            .query('insert into Usuario(Apellido, Telefono, Mail, Contraseña, Nombre) VALUES (@pApellido, @pTelefono, @pMail, @pContraseña, @pNombre)')
            console.log("query 1 terminado")
            result = await pool.request()
            .query('select max(IdUsuario) as UltimoId from Usuario');

            let max = result.recordset[0].UltimoId;
            console.log("query 2 terminado "+ max);
            result = await pool.request()
            .input('pIdUsuario' , sql.Int, max)
            .input('pMatricula' , sql.Int, usuario.Matricula)
            .input('pFirma' , sql.Image, usuario.Firma)
            .query('insert into Medico(IdUsuario, Matricula, Firma) VALUES (@pIdUsuario, @pMatricula, @pFirma)');            
            console.log("query 3 terminado")
            rowsAffected = result.rowsAffected;    
        } catch (error) {
            console.log(error); 
        }
        return rowsAffected;
    }

    insertPaciente = async (usuario) => {
        let rowsAffected = null;
        console.log('Estoy en: UsuarioService.insert(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pApellido' , sql.Text, usuario.apellido)
            .input('pTelefono' , sql.Int, usuario.Telefono)
            .input('pMail' , sql.Text, usuario.Mail)
            .input('pContraseña' , sql.Text, usuario.Contraseña)
            .input('pNombre' , sql.Text, usuario.Nombre)
            .query('insert into Usuario(Apellido, Telefono, Mail, Contraseña, Nombre) VALUES (@pApellido, @pTelefono, @pMail, @pContraseña, @pNombre)')

            result = await pool.request()
            .query('select max(IdUsuario) as UltimoId from Usuario');


            let max = result.recordsets[0].UltimoId;

            result = await pool.request()
            .input('pIdUsuario' , sql.Int, max)
            .input('pDireccion' , sql.Text, usuario.Direccion)
            .input('pFirma' , sql.Int, usuario.Dni)
            .query('insert into Paciente(IdUsuario, Direccion, Dni) VALUES (@pIdUsuario, @pDireccion, @pDni)');            
            rowsAffected = result.rowsAffected;    
        } catch (error) {
            console.log(error); 
        }
        return rowsAffected;
    }

    update = async (usuario, id) => {
        let rowsAffected = null;
        console.log('Estoy en: UsuarioService.update(usuario)');
        console.log(usuario);
        console.log(id);
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pIdUsuario' , sql.Int, usuario.IdUsuario)
            .input('pApellido' , sql.Text, usuario.apellido)
            .input('pTelefono' , sql.Int, usuario.Telefono)
            .input('pMail' , sql.Text, usuario.Mail)
            .input('pContraseña' , sql.Text, usuario.Contraseña)
            .input('pNombre' , sql.Text, usuario.Nombre)

            .query('UPDATE Receta SET IdUsuario=@pIdUsuario, Apellido=@pApellido, Telefono=@pTelefono, Mail=@pMail, Contraseña=@pContraseña, Nombre=@pNombre WHERE IdReceta=@pIdReceta');
                
        rowsAffected = result.rowsAffected;    
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }


    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log(id);
        console.log('Estoy en: UsuarioService.deleteById(id)',);
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .input('pIdUsuario', sql.Int, id)
                                .query('DELETE FROM Usuario WHERE IdUsuario = @pIdUsuario');
            rowsAffected = result.rowsAffected;    
            console.log('Delete OK');
        } catch (error) {
            console.log('Delete ERROR');
            console.log(error);
        }
        return rowsAffected;
    }
}
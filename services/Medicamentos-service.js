import config from "../dbconfig.js";
import sql from 'mssql';


export default class PharmaService 
    {
        getAll = async ()=> {
            let returnEntity = null;
            console.log('Estoy en: PharmaService.GetAll');
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                .query('select * from Medicamentos');
                returnEntity = result.recordsets[0];
            } catch (error) {
                console.log(error)
            }
            return returnEntity;
        }
    insert = async (remedio) => {
        let rowsAffected = null;
        console.log('Estoy en: PharmaciaService.insert(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pIdMedicamentos' , sql.Int, remedio.IdMedicamentos)
            .input('pNombreMedicamento' , sql.Text, remedio.NombreMedicamento)

                                .query('insert into Medicamentos( IdMedicamentos, NombreMedicamento) VALUES ( @pIdMedicamentos, @pNombreMedicamento)');
        rowsAffected = result.rowsAffected;    
        } catch (error) {
            console.log(error); 
        }
        return rowsAffected;
    }

    update = async (remedio, id) => {
        let rowsAffected = null;
        console.log('Estoy en: PharmaService.update(remedio)');
        console.log(remedio);
        console.log(id);
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pIdMedicamentos' , sql.Int, remedio.IdMedicamentos)
            .input('pNombreMedicamentos' , sql.Text, remedio.NombreMedicamento)

                                .query('insert into Medicamentos( IdMedicamentos, NombreMedicamento) VALUES ( @pIdMedicamentos, @pNombreMedicamento)');
                
        rowsAffected = result.rowsAffected;    
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }


    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: PharmaService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                                .input('pIdMedicamentos', sql.Int, id)
                                .query('DELETE FROM Medicamentos WHERE id = @pIdMedicamentos');
        rowsAffected = result.rowsAffected;    
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}
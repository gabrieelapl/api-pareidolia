import Caso from "../models/Casos.js";

class casoService {
    async getAll() {
        try {
            return await Caso.find();
        } catch (error) {
            console.log(error);
        }
    }

    async Create(dados) {
        try {
            const newCaso = new Caso(dados);
            await newCaso.save();
            return newCaso;
        } catch (error) {
            console.log(error);
        }
    }

    async Delete(id) {
        try {
            await Caso.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async Update(id, dados) {
        try {
            return await Caso.findByIdAndUpdate(id, dados, { new: true });
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(id) {
        try {
            return await Caso.findOne({ _id: id });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new casoService();
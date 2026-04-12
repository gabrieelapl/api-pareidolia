import mongoose from "mongoose";

const casoSchema = new mongoose.Schema({
    nomePaciente: { type: String, required: true },
    oQueViu: { type: String, required: true }, 
    oQueEraRealidade: { type: String, required: true }, 
    categoriaVisual: { type: String, required: true }, 
    tipoReconhecimento: { 
        type: String, 
        enum: ['Conceitual', 'Contextual'], 
        required: true 
    },
    anguloEspecifico: { type: Boolean, default: false },
    nivelClareza: { type: Number, min: 1, max: 10 },
    observacoesClinicas: { type: String },
    status: { 
        type: String, 
        enum: ['Pendente', 'Analisado'], 
        default: 'Pendente' 
    },
    historicoObservacoes: [
        {
            texto: { type: String },
            profissional: { type: String }
        }
    ]
}, { timestamps: true });

const Caso = mongoose.model("Caso", casoSchema);

export default Caso;
import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI!, { dbName: 'leetcode' });
mongoose.Promise = global.Promise;

// Definindo o sub-esquema para TopicTag
const TopicTagSchema = new Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    slug: { type: String, required: true },
}, {
    _id: false,  // Isso evita que um id seja automaticamente gerado para subdocumentos
});

// Definindo o esquema principal para Question
const QuestionSchema = new Schema({
    title: { type: String, required: true },
    titleSlug: { type: String, required: true },
    content: { type: String, required: true },
    difficulty: { type: String, required: true },
    acRate: { type: Number, required: true },
    topicTags: { type: [TopicTagSchema], required: true },  // usando o sub-esquema aqui
}, {
    collection: 'questions',
    timestamps: true,  // adiciona campos createdAt e updatedAt
}, );

// Configurando a transformação toJSON
QuestionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

export const db = {
    Question: questionModel(),  // exportando o novo modelo de Question
};


function questionModel() {
  if (mongoose.modelNames().includes('Question')) {
      return mongoose.model('Question');  // retornando o modelo de Question existente
  } else {
      return mongoose.model('Question', QuestionSchema);  // criando e retornando um novo modelo de Question
  }
}

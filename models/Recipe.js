const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    cuisine: String,
    title: String,
    rating: { type: Number, default: null },
    prep_time: { type: Number, default: null },
    cook_time: { type: Number, default: null },
    total_time: { type: Number, default: null },
    description: String,
    nutrients: {
        calories: { type: Number, default: null },
        carbohydrateContent: { type: Number, default: null },
        cholesterolContent: { type: Number, default: null },
        fiberContent: { type: Number, default: null },
        proteinContent: { type: Number, default: null },
        saturatedFatContent: { type: Number, default: null },
        sodiumContent: { type: Number, default: null },
        sugarContent: { type: Number, default: null },
        fatContent: { type: Number, default: null }
    },
    serves: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipe');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://purushoth:purushoth123@cluster0.qae8k.mongodb.net/CVE?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Parse JSON data and store in MongoDB
app.post('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.insertMany(req.body);
        res.status(201).json({ success: true, data: recipes });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// Get recipes (pagination + sorting)
app.get('/api/recipes', async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const recipes = await Recipe.find()
            .sort({ rating: -1 }) // Sort by rating descending
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Recipe.countDocuments();

        res.json({
            page,
            limit,
            total,
            data: recipes
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Search recipes based on filters
app.get('/api/recipes/search', async (req, res) => {
    try {
        const { calories, title, cuisine, total_time, rating } = req.query;
        let filter = {};

        if (calories) filter['nutrients.calories'] = { $gte: parseInt(calories) };
        if (title) filter['title'] = { $regex: title, $options: 'i' };
        if (cuisine) filter['cuisine'] = cuisine;
        if (total_time) filter['total_time'] = { $lte: parseInt(total_time) };
        if (rating) filter['rating'] = { $gte: parseFloat(rating) };

        const recipes = await Recipe.find(filter);

        res.json({ data: recipes });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

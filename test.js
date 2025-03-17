const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://purushoth:purushoth123@cluster0.qae8k.mongodb.net/CVE?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

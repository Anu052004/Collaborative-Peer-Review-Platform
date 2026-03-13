
const express = require('express');
const mongoose = require('mongoose');
const assignmentRoutes = require('./routes/assignmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.use(logger);

mongoose.connect('mongodb://127.0.0.1:27017/peerreview', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.error(err));

app.use('/assignments', assignmentRoutes);
app.use('/reviews', reviewRoutes);

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

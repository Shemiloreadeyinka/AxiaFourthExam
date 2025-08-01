const express = require('express');
const dotenv = require('dotenv');
const fileuploadRoutes = require('./routes/fileuploadRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', fileuploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

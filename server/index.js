const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

//mongoose
mongoose.connect("mongodb://localhost:27017/rjpos", {
	useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).catch(err => console.log(err));
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// routes
const itemRoutes = require('./routes/items')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')

const checkAuth = require('./middlewares/checkAuth');
//middlewares
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/items', checkAuth, itemRoutes)
app.use('/categories', checkAuth, categoryRoutes)
app.use('/orders', checkAuth, orderRoutes)
app.use('/users', checkAuth, userRoutes)

app.all('*', (req, res) => {
	res.status(404).json({msg:"Page not found"})
})

app.listen(PORT, () => console.log('app connected to port ', PORT))






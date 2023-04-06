import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import Routes from './routes/loginRoutes'
// initializations

const app = express();

// settings
app.set('port', process.env.PORT || 3000);


//middleware
app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//routes
app.get('/', (req, res) => {
    res.send('Arithmetic Calculator REST API by Nicolas ')
});

app.use(Routes)

export default app
const express = require('express');

const bodyParser = require('body-parser');

const ejsEngine = require('ejs-mate');

// eslint-disable-next-line no-unused-vars
// const cors = require('cors');

const dotenv = require('dotenv');

// cookie
const session = require('express-session');

const methodOverride = require('method-override');

const mongoose = require('mongoose');

const MongoStore = require('connect-mongo');

const app = express();

const PORT = process.env.PORT || 3000;

const userRoutes = require('./modules/user/routes');

const postRoutes = require('./modules/post/routes');

const adminRoutes = require('./modules/admin/routes');

const clientRoutes = require('./routes/index');

const commentRoutes = require('./modules/comment/routes');

dotenv.config();

app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');
app.engine('ejs', ejsEngine);

app.use('/public', express.static('./public'));

app.use(methodOverride('_method'));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.CONNECT_MONGODB,
    ttl: 1 * 24 * 60 * 60,
  }),
}));

app.use('/user', userRoutes);

app.use('/post', postRoutes);

app.use('/admin', adminRoutes);

app.use('/comment', commentRoutes);

app.use('/', clientRoutes);

app.listen(PORT);

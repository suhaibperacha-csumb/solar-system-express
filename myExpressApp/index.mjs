import express from 'express';
import fetch from 'node-fetch';

const planets = (await import('npm-solarsystem')).default;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));


// HOME with guaranteed random background (picsum)
app.get('/', async (req, res) => {
  let image;

  try {
    image = "https://picsum.photos/2000/1200?random=" + Date.now();
  } catch {
    image = "/img/solar-system.jpg";
  }

  res.render("index", { image });
});


// PLANET ROUTES
app.get('/mercury', (req, res) => {
  res.render('planet', { info: planets.getMercury(), name: "Mercury" });
});
app.get('/venus', (req, res) => {
  res.render('planet', { info: planets.getVenus(), name: "Venus" });
});
app.get('/earth', (req, res) => {
  res.render('planet', { info: planets.getEarth(), name: "Earth" });
});
app.get('/mars', (req, res) => {
  res.render('planet', { info: planets.getMars(), name: "Mars" });
});
app.get('/jupiter', (req, res) => {
  res.render('planet', { info: planets.getJupiter(), name: "Jupiter" });
});
app.get('/saturn', (req, res) => {
  res.render('planet', { info: planets.getSaturn(), name: "Saturn" });
});
app.get('/uranus', (req, res) => {
  res.render('planet', { info: planets.getUranus(), name: "Uranus" });
});
app.get('/neptune', (req, res) => {
  res.render('planet', { info: planets.getNeptune(), name: "Neptune" });
});


// NASA PICTURE OF THE DAY PAGE
app.get('/nasa', async (req, res) => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=2024-11-14`;

  let data = await fetch(url);
  let nasa = await data.json();

  res.render('nasa', { nasa });
});


app.listen(3000, () => {
  console.log('server started');
});

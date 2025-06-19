import express from 'express';

const app = express();
const port = 3000;

// Middleware para leer JSON del body
app.use(express.json());

// Rutas GET

app.get('/', (request, response) => {
  response.send('Abrir puerta');
});

app.get('/cocina', (request, response) => {
  response.send('Llegaste a la cocina');
});

app.get('/cocina/heladera', (request, response) => {
  const tipoVaso = request.query['tipoVaso'];

  if (!tipoVaso) {
    response.send('Abriste la heladera');
    return;
  }

  response.send(`Abriste la heladera y trajiste solo un ${tipoVaso}`);
});

app.get('/cocina/heladera/:tipoBebida', (request, response) => {
  const tipoVaso = request.query['tipoVaso'];
  const tipoBebida = request.params.tipoBebida;

  if (!tipoVaso) {
    response.send('Abriste la heladera');
    return;
  }

  if (!tipoBebida) {
    response.send(`Abriste la heladera y trajiste solo un ${tipoVaso}`);
    return;
  }

  response.send(`Abriste la heladera y te serviste ${tipoBebida} en un ${tipoVaso}`);
});

// Rutas POST, PUT, PATCH, DELETE

app.post('/cocina/heladera', (request, response) => {
  const bebida = request.body.bebida;
  if (!bebida) {
    return response.status(400).send('Falta especificar la bebida en el cuerpo de la petición');
  }
  response.send(`Se agregó ${bebida} dentro de la heladera`);
});

app.put('/cocina/heladera', (request, response) => {
  const bebida = request.body.bebida;
  if (!bebida) {
    return response.status(400).send('Falta especificar la bebida para reemplazar en el cuerpo de la petición');
  }
  response.send(`Se reemplazó la bebida de la heladera por ${bebida}`);
});

app.patch('/cocina/heladera', (request, response) => {
  const bebida = request.body.bebida;
  if (!bebida) {
    return response.status(400).send('Falta especificar la bebida para actualizar en el cuerpo de la petición');
  }
  response.send(`Se actualizó parcialmente la heladera, añadiendo ${bebida}`);
});

app.delete('/cocina/heladera', (request, response) => {
  const bebida = request.body.bebida;
  if (!bebida) {
    return response.status(400).send('Falta especificar la bebida a eliminar en el cuerpo de la petición');
  }
  response.send(`Se eliminó ${bebida} de la heladera`);
});

// Levantar servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
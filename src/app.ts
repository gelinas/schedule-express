require('dotenv').config();
require('pretty-error').start();
import { Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { init } from './init';
import { Shift } from './models';
import { engineersView, shiftsView } from './views';

// init express app and global middleware
const app = init();

// call to root
app.get('/', (req, res) => {
  return res.json({ message: 'SHALL WE PLAY A GAME?' });
});

// health check endpoint
app.get('/ping', (req, res) => {
  return res.status(200).json({ message: 'service running' });
});

// fetch all engineers and shifts
app.get('/all', async (req, res) => {
  const [engineers, shifts] = await Promise.all([engineersView(), shiftsView()]);
  return res.json({ engineers, shifts });
});

// add a new shift for a given engineer id to the database
app.post('/shifts', async (req, res) => {
  console.log(req.body);
  const { engineerId, startDate, endDate } = req.body;
  await Shift.create({
    engineerId,
    startDate,
    endDate,
  });

  const shifts = await shiftsView();
  return res.json({ shifts });
});

// updates a shift for a given shift id
app.put('/shifts/:id', async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate, engineerId } = req.body;
  const shift = await Shift.findByPk(id);
  if (!shift) {
    return res.status(404).json({ message: 'shift not found' });
  }
  await shift.update({
    startDate,
    endDate,
    engineerId,
  });

  const shifts = await shiftsView();
  return res.json({ shifts });
});

// deletes a shift for a given shift id
app.delete('/shifts/:id', async (req, res) => {
  const { id } = req.params;
  const shift = await Shift.findByPk(id);
  if (!shift) {
    return res.status(404).json({ message: 'shift not found' });
  }
  await shift.destroy();

  const shifts = await shiftsView();
  return res.json({ shifts });
});

// catch 404
app.use(function (req, res) {
  return res.status(404).json({ message: 'Invalid route (404)' });
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message || 'internal server error' });
});

export default app;

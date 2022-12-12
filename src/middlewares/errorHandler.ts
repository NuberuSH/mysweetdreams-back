
export function errorHandler(err, req, res, next) {
  if (!err) {
    return next();
  }
  
  const message = `Error en ${req.method} ${req.url}`;
  console.error(message);
  res.status(500).send('Server error');
  return;
}
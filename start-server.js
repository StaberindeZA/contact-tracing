import app from './server';
import { db } from './api/db';

// sync db for development
db.sync()
  .then(() => {
    console.log('The postgres server is running...');
    app.listen(app.get('port'), () => {
      console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
    });
  })
  .catch(console.error);

// app.listen(app.get('port'), () => {
//   console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
// });

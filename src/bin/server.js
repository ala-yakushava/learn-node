import getApp from '..';

const port = process.env.PORT || 3000;
getApp().listen(port, () => console.log(`App listening at http://localhost:${port}`));

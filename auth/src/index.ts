import { app } from './app';
import dotenv from 'dotenv-safe';

dotenv.config();

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

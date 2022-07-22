import express from 'express';

export const serve = (port: number, fileName: string, dir: string) => {
    const app = express();
 
    app.listen(port, () => {
        console.log(`Serving ${fileName} on port ${port}`);
    }
    );
};

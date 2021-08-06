import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  const statdir = path.join(__dirname, 'dist/fe/index.html');
  res.sendFile(statdir);
});

export { router as indexRouter };

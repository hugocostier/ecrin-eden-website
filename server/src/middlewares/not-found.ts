import { Request, Response } from 'express'

const notFoundMiddleware = (req: Request, res: Response) => res.status(404).send('404 - Page Not Found') 

export default notFoundMiddleware
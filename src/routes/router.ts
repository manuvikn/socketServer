import { Router, Request, Response } from 'express';


export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });

});

router.post('/mensajes', (req: Request, res: Response) => {

    const { persona } = req.body;
    


    res.json({
        ok: true,
        persona
    });

});


router.post('/mensajes/:id', (req: Request, res: Response) => {

    const { persona } = req.body;
    const { id } = req.params;
    

    res.json({
        ok: true,
        persona,
        id
    });

});
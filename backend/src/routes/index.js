import {Router} from 'express';
const router = Router();

//creacion de rutas

router.get('/' , (req , res) => {

    res.json({

        "message" : "hola desde rutas"

    })

})

export default router;
import {Router} from 'express';
const router = Router();



//creacion de rutas

router.get('/' , (req , res) => {

    res.json({

        "message" : "hola desde rutas",
    })

    
})

router.post('/agregar' , (req , res )  => {

    res.json({

        "message" : "agregaste un usuario"
        
    })
    console.log("procesado");
    
})

router.delete('/eliminar' , (req , res ) => {
    res.json({

        "message"  : "eliminaste un usuario"
    })
    console.log("procesado");
    
})
router.put('/actualizar' , (req  , res ) => {
    res.json({

        "message"  : "actualizaste un usuario"
    })
    console.log("procesado");
    })

export default router;
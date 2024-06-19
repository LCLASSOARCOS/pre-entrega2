

import express from "express";
import ProductManager from "../controllers/products-manager-db.js";


const router = express.Router();

const pm = new ProductManager();




//esto va a ir a products router

//MOSTRAR PRODUCTOS
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;

        // Llamar al ProductManager para obtener productos
        const productList = await pm.getProducts();
        
        // Extraer el límite de la consulta

        
        if (limit) {
            res.json(productList.slice(0, limit));
        } else {
            res.json(productList);
        }
        
    } catch (error) {
        console.error("Error al obtener productos:", error);
        // Devolver error 500 para errores del servidor
        return res.status(500).json({
            status: false,
            msg: "Error interno del servidor",
        });
    }
});

  //MOSTRAR PRODUCTO POR ID
  router.get("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid; // Mantener como cadena de texto
        
        // Obtener producto por ID usando el ProductManager
        const product = await pm.getProductById(productId);
        
        if (product.status) { // Verificar si se encontró el producto
            return res.status(200).json({ 
                status: true, 
                product: product.product, 
                msg: "Producto encontrado exitosamente" 
            });
        } else {
            return res.status(404).json({ 
                status: false, 
                msg: "Producto no encontrado" 
            });
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error.message); 
        return res.status(500).json({ 
            status: false, 
            msg: "Error interno del servidor" 
        });
    }
});

// AGREGAR PRODUCTO
router.post("/", async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        const respuesta = await pm.addProduct({
            title, description, price, thumbnail, code, stock, status, category
        });

        if (respuesta.status) {
            return res.status(200).json(respuesta); // Producto agregado exitosamente
        } else {
            return res.status(400).json(respuesta); // Error al agregar el producto
        }
    } catch (error) {
        console.error("Error al agregar el producto:", error.message);
        return res.status(500).json({ status: false, msg: "Error interno del servidor" });
    }
});
// ACTUALIZAR PRODUCTO
router.put("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid; // Tratar el ID como cadena de texto
        const productData = req.body; // Obtener el objeto con los campos a actualizar

        const respuesta = await pm.updateProduct(productId, productData);

        if (respuesta.status) {
            return res.status(200).json(respuesta); // Producto actualizado correctamente
        } else {
            return res.status(400).json(respuesta); // Producto no encontrado o error en la actualización
        }
    } catch (error) {
        console.error("Error al actualizar el producto:", error.message);
        return res.status(500).json({ status: false, msg: "Error interno del servidor" });
    }
});
/*
PARA ACTUALIZAR EL PRODUCTO SE ESCRIBE CON EL SIGUIENTE FORMATO:
{
    "campo": "price",
    "valor": 2222
}
*/

// BORRAR PRODUCTO
router.delete("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid; // Usar ID como cadena de texto
        const respuesta = await pm.deleteProduct(productId);

        if (respuesta.status) {
            return res.status(200).json(respuesta); // Producto eliminado correctamente
        } else {
            return res.status(404).json({
                status: false,
                msg: `Producto con ID ${productId} no encontrado.`
            }); // Respuesta clara para producto no encontrado
        }
    } catch (error) {
        console.error("Error al borrar el producto:", error.message);
        return res.status(500).json({
            status: false,
            msg: "Error interno del servidor: " + error.message
        });
    }
});


export default router;

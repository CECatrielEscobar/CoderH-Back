"use strict";
const fs = require('fs');
class ProductManager {
    constructor(path) {
        this.variablePrivada = 0;
        this.products = [];
        this.path = path;
    }

    // AGREGAR UN PRODUCTO
    async addProduct( title, description, price, thumbnail, code, stock ) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock)
            return console.log('Todos los campos son obligatorios');
        if (this.products.length === 0) {
            const newProduct = {
                title:title,
                description:description,
                price:price,
                thumbnail:thumbnail,
                code:code,
                stock:stock,
                id: this.variablePrivada
            };
            this.variablePrivada += 1;
            this.products.push(newProduct);
            await fs.promises.writeFile(`${this.path}Productos.json`,JSON.stringify(this.products))
            return console.log('Producto registrado correctamente')
            
        }
        const validacion = this.products.some(product => product.code === code)
        if(validacion) return console.log('el producto ingresado ya se encuentra registrado')
        const newProduct = {
            title:title,
            description:description,
            price:price,
            thumbnail:thumbnail,
            code:code,
            stock:stock,
            id: this.variablePrivada
        };
        this.variablePrivada += 1;
        this.products.push(newProduct);
        await fs.promises.writeFile(`${this.path}Productos.json`,JSON.stringify(this.products))
        return console.log('Producto registrado correctamente')
        } catch (error) {
            console.log('No se pudo registrar el producto',error)
        }
    }

    // ACTUALIZAR ALGUN PRODUCTO
    async updateProduct (id,elementNew,newValue) {
        try {
            const variableString = await fs.promises.readFile(`${this.path}Productos.json`,'utf-8')
            const datosParseados = JSON.parse(variableString)
            let productIndex = datosParseados.findIndex(product => product.id === id)
            if(productIndex === -1) return console.log('Producto no encontrado, por favor ingresa una ID correcta')
            datosParseados[productIndex][elementNew] = newValue
            this.products = datosParseados
            const producto = datosParseados.find(prod => prod.id === id)
            await fs.promises.writeFile(`${this.path}Productos.json`,JSON.stringify(datosParseados))
            return producto
        } catch (error) {
            console.log('No hay datos guardados',error)
        }
    }

    // OBTENER TODOS LOS PRODUCTOS
    async getProducts () {
        try {
            const variableString = await fs.promises.readFile(`${this.path}Productos.json`,'utf-8')
            const datosParseados = JSON.parse(variableString)
            return datosParseados
        }catch(error) {
            console.log('No hay datos guardados para devolver')
        }
    }
    // OBTENER PRODUCTO POR ID
    async getProductById (id) {
        try {
            const variableString = await fs.promises.readFile(`${this.path}Productos.json`,'utf-8')
            const datosParseados = JSON.parse(variableString)
            return datosParseados.find(producto => producto.id === id)
        }catch(error) {
            console.log('No hay datos guardados para devolver')
        }
    }
    async deleteProduct (id) {
        try {
            const variableString = await fs.promises.readFile(`${this.path}Productos.json`,'utf-8')
            const datosParseados = JSON.parse(variableString)
            const newProducts = datosParseados.filter(producto => producto.id !== id)
            this.products = newProducts
            await fs.promises.writeFile(`${this.path}Productos.json`,JSON.stringify(newProducts))
            return newProducts
        }catch(error) {
            console.log('No hay datos guardados para devolver')
        }
    }
}


// para probar las funcionalidades de la clase

const producto = new ProductManager('./')

async function addProductAsync (instancia,title,description,price,thumbnail,code,stock) {
    try {
        await instancia.addProduct(title,description,price,thumbnail,code,stock);

    } catch (error) {
        console.log('hubo un error al agregar un producto',error)        
    }
}

async function getProductAsync (instancia) {
    try {
        const res =  await instancia.getProducts()
        console.log(res)
    } catch (error) {
        console.log(error, 'getProduct')
    }
}

async function getProductByIdAsync (instancia,id) {
    try {
        const res = await instancia.getProductById(id)
        console.log(res)
    } catch (error) {
        console.log('error',error)
    }
}

async function updateProductAsync (instancia,id,elementNew,newValue) {
    try {
        const res = await instancia.updateProduct(id,elementNew,newValue)
        console.log('el producto actualizado es: \n', res)
    } catch (error) {
        console.log(error,'error')
    }
}

async function deleteProductAsync (instancia,id) {
    try {
        const res = await instancia.deleteProduct(id)
        console.log('Lista actualizada de productos: \n', res)
    } catch (error) {
        console.log(error,'error')
    }
}
addProductAsync(producto,'prueba1', 'productoDes1', 15, './img', 'x3ty', 152);
addProductAsync(producto,'prueba2', 'productoDes2', 25, './img', 'x3tau', 19);
addProductAsync(producto,'prueba3', 'productoDes3', 35, './img', 'x3tdu', 18);
addProductAsync(producto,'prueba4', 'productoDes4', 45, './img', 'x3tsu', 17);
addProductAsync(producto,'prueba5', 'productoDes5', 55, './img', 'x3tzu', 16);



// [[ PARA PROBAR EL FUNCIONAMIENTO ]]

// getProductByIdAsync(producto,1)

// getProductAsync(producto)

// updateProductAsync(producto,0,'title','pruebaUpdate')

// deleteProductAsync(producto,1)


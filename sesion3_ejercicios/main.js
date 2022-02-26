// COMPONENTE
Vue.component('product', {
    template: `
    <div class="product"> 
    <div class="product-image">
        <img v-bind:src="image" alt="">
    </div>
    <div class="product-info">
        <h1>{{ product }} </h1>
        <h4>{{vendidoPor}}</h4>
        <a :href="product_link" target="_blank">Detalles</a>
        <p v-if="inventory > 10">Disponible</p>
       <p v-else-if="inventory <= 10 && inventory > 0">Ultimos artículos</p> 
        <p v-else>No disponible</p>
        <!-- Detalles de producto -->
        <ul>
            <li v-for="detail in details">
                {{detail}}
            </li>
        </ul>
        <!-- Variantes del producto -->
        <p>Modelos disponible: </p>
        <div v-for="(variant,index) in variants" 
        :key="variant.varianId"
        class="color-box" 
        :style="{backgroundColor:variant.variantColor}"
        @mouseover="updateProduct(index)"> 
            <!-- <p >
                {{variant.variantColor}}
            </p> -->
        </div>
        <!-- Botón para agregar productos -->
        <button v-on:click="addToCart" 
        :disabled="!inStock"
        :class="{disabledButton: !inStock }"
        >Agregar producto</button>
    </div>
    </div>
    `,
    data() {
        return {
        proveedor: 'Intercompras',
        product: 'Laptop Lenovo IdeaPad 330-14AST',
        
        // image: 'black_lenovo.jpg',
        selectedProduct: 0,
        product_link: 'https://intercompras.com/p/laptop-lenovo-ideapad-14ast-amd-a4-4gb-500gb-windows-home-159811',
        // inStock: false,
        inventory: 100,
        details: ["AMD A4-9125","500GB","RAM 4GB", "Windows 10 Home"],
        variants:[
            {
                varianId: 0123,
                variantColor: 'Black',
                variantImage: 'black_lenovo.jpg',
                disponible: 10
            },
            {
                varianId: 1234,
                variantColor: 'Gray',
                variantImage: 'gray_lenovo.jpg',
                disponibles: 0

            }
        ]

    }
},
methods: {
    addToCart(){
        this.$emit('add-to-cart', this.variants[this.selectedProduct].varianId)
        // this.cart += 1
    },
    updateProduct(index){
        this.selectedProduct = index
    }
},
computed: {
    vendidoPor(){
        return 'Provedor: ' + this.proveedor
    },
    image(){
        return this.variants[this.selectedProduct].variantImage
    },
    inStock(){
        return this.variants[this.selectedProduct].disponible
    }
}
})
// INSTANCIA DE VUE
var app = new Vue({
    el: '#app',
    data: {   
        cart: [] 
    },
    methods: {
        updateCart(id){
            // this.cart += 1
            this.cart.push(id)
        }
    }
})
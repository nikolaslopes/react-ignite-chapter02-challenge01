import React, { useState, useEffect } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'

import { ProductList } from './styles'
import { formatPrice } from '../../util/format'
import { useCart } from '../../hooks/useCart'
import { getProducts } from './services'
import { IProductFormatted } from '../../interfaces/IProductFormatted'

interface CartItemsAmount {
  [key: number]: number
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<IProductFormatted[]>([])
  // const { addProduct, cart } = useCart();

  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  //   // TODO
  // }, {} as CartItemsAmount)

  useEffect(() => {
    fetchAndUpdateProducts()
  }, [])

  async function fetchAndUpdateProducts() {
    const data = await getProducts()

    setProducts(data)
  }

  function handleAddProduct(id: number) {
    // TODO
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{formatPrice(product.price)}</span>
          <button
            type="button"
            data-testid="add-product-button"
            // onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {/* {cartItemsAmount[product.id] || 0} */}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  )
}

export default Home

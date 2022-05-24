import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import { Product, Stock } from '../types'

interface CartProviderProps {
  children: ReactNode
}

interface UpdateProductAmount {
  productId: number
  amount: number
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart)
    }

    return []
  })

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart]

      //     !!  vou te explicar aqui, mas se tiver continuar com dúvida pode me chamar discord. Quando você faz o find, ele retorna o elemento do array. Porém, lembre que é um array de objetos e, dessa forma, o find retorna a referência do objeto, não uma cópia dele. Então você pode atualizar esse elemento diretamente que também altera no array.

      // !!Inclusive, isso acabou ocasionado em um erro no vídeo que, apesar de não interferir, vale a pena apontar. Um dos comentários aqui do vídeo é do Rafael Kozar, respondi ele por lá de forma mais completa.

      console.log('1', updatedCart)

      const productExists = updatedCart.find(
        (product) => product.id === productId
      )

      const stock = await api.get(`stock/${productId}`)

      const stockAmount = stock.data.amount

      const currentAmount = productExists ? productExists.amount : 0

      const amount = currentAmount + 1

      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      if (productExists) {
        productExists.amount = amount
      } else {
        const product = await api.get(`products/${productId}`)

        const newProduct = {
          ...product.data,
          amount: 1,
        }

        console.log('2')

        updatedCart.push(newProduct)
      }

      setCart(updatedCart)
      console.log('3', updatedCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart))
    } catch {
      toast.error('Erro na adição do produto')
    }
  }

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  }

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}

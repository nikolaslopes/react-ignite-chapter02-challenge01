import { api } from '../../services/api'

export async function loadProducts() {
  const request = await api.get('products')

  console.log(request)
}

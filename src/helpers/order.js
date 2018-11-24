/**
 * Получает jwt токен с сервера
 * @param address адрес сервера
 * @param basketID id корзины на сервере
 * @param jwtToken jwt токен для аутентификации на сервере
 * @return {Promise<Response>} jwt токен
 */
export function order(address, basketID, jwtToken) {
  return (
    fetch(`${address}/api/carts/${basketID}/orders`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
  }));
}
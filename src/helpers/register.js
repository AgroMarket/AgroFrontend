/**
 * Получает jwt токен с сервера
 * @param address адрес сервера
 * @param login логин, зарегистрированный на сервере
 * @param password пароль пользователя
 * @return {Promise<Response>} jwt токен
 */
export function register(serverAddress, email, password, name, phone, address) {
  const registerJSON = JSON.stringify({
    'consumer':
      {
        'email': email,
        'password': password,
        'name': name,
        'phone': phone,
        'address': address,
      },
  });
  return (fetch(`${serverAddress}/api/consumers`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: registerJSON,
  }));
}
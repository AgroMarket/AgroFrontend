/**
 * Получает jwt токен с сервера
 * @param address адрес сервера
 * @param login логин, зарегистрированный на сервере
 * @param password пароль пользователя
 * @return {Promise<Response>} jwt токен
 */
export function login(address, login, password) {
  const authJSON = JSON.stringify({
    'auth':
      {
        'email': login,
        'password': password,
      },
  });
  return (fetch(`${address}/api/login`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: authJSON,
  }));
}
/**
 * Регистрирует пользователя на сервере
 * @param address адрес сервера
 * @param login логин, зарегистрированный на сервере
 * @param password пароль пользователя
 * @param name имя пользователя
 * @param phone телефон пользователя
 * @param region адрес пользователя
 * @return {Promise<Response>} сведения о зарегистрированном пользователе
 */
export function register(address, login, password, name, phone, region) {
  const registerJSON = JSON.stringify({
    'member':
      {
        'user_type': 'consumer',
        'email': login,
        'password': password,
        'name': name,
        'phone': phone,
        'address': region,
      },
  });
  return (fetch(`${address}/api/members`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: registerJSON,
  }));
}
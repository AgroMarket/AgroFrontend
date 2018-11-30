/**
 * Проверяет браузер на доступность localStorage или sessionStorage
 * @param type тип хранилища в браузере (localStorage или sessionStorage)
 * @return {boolean} true, если браузер поддерживает
 */
export function storageAvailable(type) {
  try {
    const storage = window[type],
      x = 'x';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}
/**
 * Проверяет браузер на доступность localStorage
 * @param type
 * @return {boolean}
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
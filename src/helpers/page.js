import {serverAddress} from 'constants/ServerAddress';

export function page(page) {
  return (fetch(`${serverAddress}/api/pages/${page}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }));
}
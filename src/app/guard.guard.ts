import {CanActivateFn} from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const valid = !!(user && user?.username);
  if (!valid) {
    alert('Bạn chưa đăng nhập');
    window.location.href = '/login';
    return valid;
  }
  return valid;
};

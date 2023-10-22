import {CanActivateFn} from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const valid = !!(user && user?.username && user?.roleId == 1);
  if (!valid) {
    alert('Bạn không có quyền truy cập');
    window.location.href = '/';
    return valid;
  }
  return valid;
};

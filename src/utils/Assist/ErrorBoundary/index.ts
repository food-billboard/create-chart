import * as Sentry from '@sentry/react';

let setting = false;

export function errorSettingWrapper(callback: () => void) {
  if (process.env.NODE_ENV !== 'production') return;
  callback();
}

function _setErrorOriginUser(userInfo: any) {
  if (setting) return;
  setting = true;
  Sentry.setUser({
    id: userInfo._id,
    username: userInfo.username,
  });
}

export function setErrorOriginUser(userInfo: any) {
  errorSettingWrapper(() => _setErrorOriginUser(userInfo));
}

function _unsetErrorOriginUser() {
  if (!setting) return;
  setting = false;
  Sentry.configureScope((scope) => scope.setUser(null));
}

export function unsetErrorOriginUser() {
  errorSettingWrapper(() => _unsetErrorOriginUser());
}

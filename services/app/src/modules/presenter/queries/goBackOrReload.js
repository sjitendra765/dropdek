export const goBackOrReload = (reload, history) => (e) => {
  const { referrer } = document;
  if (referrer !== undefined && referrer.indexOf(window.location.host) !== -1) {
    e.preventDefault();
    history.goBack();
  } else if (reload !== undefined) {
    reload();
  }
};

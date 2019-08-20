export function getParam(myParam) {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get(myParam);

  return param;
}

export default { getParam };

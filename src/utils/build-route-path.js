function buildRoute(path) {
  const routesParametersRegex = /:([a-zA-Z]+)/g;
  const routeWithParamsRegex = path.replaceAll(
    routesParametersRegex,
    '(?<$1>[a-zA-Z0-9_]+)',
  );
  const pathRegex = new RegExp(`^${routeWithParamsRegex}(?<query>\\?(.*))?$`);

  return pathRegex;
}

export { buildRoute };

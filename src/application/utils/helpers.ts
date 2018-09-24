
export const getMorganLogLevel = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'dev';
    case 'staging':
      return '';
    case 'production':
      return '';
    default:
      return 'none';
  }
  return '';
};

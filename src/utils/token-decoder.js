import jwt_decode from 'jwt-decode';

const jwtDecoder = (token) => {
  if (!token) {
    console.error('Token não fornecido');
    return null;
  }

  try {
    const decodedToken = jwt_decode(token);

    if (!decodedToken) {
      console.error('Token inválido');
      return null;
    }

    if (Date.now() >= decodedToken.exp * 1000) {
      console.error('Token expirado');
      return null;
    }

    return decodedToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default jwtDecoder;

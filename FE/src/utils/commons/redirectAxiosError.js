const redirectAxiosError = async (method, redirectURL, navigate) => {
  try {
    const { data, status } = await method();
    if (status === 200) {
      return data;
    } else {
      navigate(redirectURL);
    }
  } catch (error) {
    console.log(error);
    navigate('/main');
  }
};

export default redirectAxiosError;

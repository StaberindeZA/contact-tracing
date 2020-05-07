const successMessage = (executor) => {
  return {
    statusCode: 200,
    text: `Successfully executed ${executor}`
  };
}

const failMessage = (executor, code = 500) => {
  return {
    statusCode: code,
    text: `An error ocurred when executing ${executor}`
  };
}

//Pause for ms milliseconds. Use to simulate fetch calls to server.
const pauseFor = async (ms) => {
  return new Promise( res => setTimeout(res,ms) );
}

// Use this function to call the login API
const callLogin = async (user) => {
  let result;

  try {
    // TODO - Call fetch to server here. Login call.
    await pauseFor(400);
    result = successMessage("Login");
  } catch (error) {
    result = failMessage("Login");
  }

  return result;  
}

const callUser = async (user) => {
  let userObj = {};
  let userResults;
  
  try {
    // TODO - Call fetch to server here. User data call.
    await pauseFor(400);
    userResults = successMessage("User");
    userObj = {
      userId: '567',
      username: user,
      status: 'Positive'
    }
  } catch (error) {
    userResults = failMessage("User");
  }

  
  return { userObj, userResults };  
}

export { callLogin, callUser };
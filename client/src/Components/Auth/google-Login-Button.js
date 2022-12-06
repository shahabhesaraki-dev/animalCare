import { GoogleLogin } from "react-google-login";

const GoogleLoginButton = () => {
  const clientCode = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLogin = (googleData) => {
    console.log("Login Success", googleData.profileObj);
  };

  const handleFailure = (result) => {
    console.log("Login Failed", result);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientCode}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};
export default GoogleLoginButton;

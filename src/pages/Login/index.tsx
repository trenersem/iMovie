import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { Form } from "../../components/Form";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import * as Toaster from "../../components/Toaster";
import { useAppDispatch } from "../../store/hooks";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigateTo("/");
        Toaster.showSuccessToast(`${email}, has successfully logged in`);
      })
      .catch(() => Toaster.showErrorToast("Invalid user!"));
  };

  return (
    <AuthForm>
      <h1 className="">Login</h1>
      <Form title="Sign in" handleClick={handleLogin} />
      <p className="">
        Or <Link to="/register">Register</Link>
      </p>
      <p style={{ marginTop: "30px", textAlign: "center" }}>
        This registration is formal and is used exclusively for educational
        purposes, please enter the correct email and name to continue working
        with the site, you can enter false data, your data will not be used in
        any way except for registration
      </p>
    </AuthForm>
  );
};

export default LoginPage;

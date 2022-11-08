import { Link } from "react-router-dom";
import { Form } from "../../components/Form";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import * as Toaster from "../../components/Toaster";
import AuthForm from "../../components/AuthForm";
import { useAppDispatch } from "../../store/hooks";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        navigateTo("/");
        Toaster.showSuccessToast(`${email}, has been successfully registered`);
      })
      .catch((err) => {
        Toaster.showErrorToast(`Something went wrong... ${err.message}`);
      });
  };
  return (
    <AuthForm>
      <h1>Register</h1>
      <Form title="Register" handleClick={handleRegister} />
      <p>
        Already have an account?{" "}
        <Link to="/login">
          <strong>Sign in </strong>
        </Link>
      </p>
    </AuthForm>
  );
};

export default RegisterPage;

"use client";
import Link from "next/link";
import React, { FormEvent, useState, useMemo } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { HttpStatusCode } from "axios";
import "./styles.css";
const instance = axios.create({
  baseURL: process.env.URL_API,
});

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [usernameSignIn, setUsernameSignIn] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const isPasswordCorrect = useMemo(() => {
    const valid = password === passwordConfirm;

    return valid;
  }, [password, passwordConfirm]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = toast.loading("Loading...");
    setLoading(true);
    if (usernameSignIn && passwordSignIn) {
      instance
        .post(`/auth/login`, {
          username: usernameSignIn,
          password: passwordSignIn,
        })
        .then(async (response: AxiosResponse) => {
          if (response.status === HttpStatusCode.Created) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("tokenExpirationTime", response.data.expireIn);
            router.push("/home");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error: AxiosError) => {
          console.error(error);
          toast.done(id);
          toast.error("Error en el server");
        })
        .finally(() => {
          toast.done(id);
          setLoading(false);
        });
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    const id = toast.loading("Loading", {});
    setLoading(true);

    try {
      const response = await instance.post(`/auth/register`, {
        fullName,
        username,
        password,
      });

      if (response.status === HttpStatusCode.Created) {
        toast.done(id);
        localStorage.setItem("token", response.data.token);
        router.push("/home");
      } else {
        toast.done(id);
        toast.error("Error in server", {
          hideProgressBar: true,
          position: "top-right",
        });
      }
    } catch (error) {
      toast.done(id);

      toast.error("Error in Server comeback later", {
        autoClose: 1000,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "url(/images/abstract-green-waves-1.png)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-cyan-50 text-right p-3 h2">
          @Dont give up, fight for your{" "}
          <span className="text-2xl text-cyan-700 span">Dreams</span>
        </h2>

        <div className="general-container">
          <div
            className={`container-login ${
              !isLogin ? "right-panel-active" : ""
            }`}
            id="container"
          >
            <div className="form-container sign-up-container ">
              <form action="" onSubmit={handleRegister} className="form">
                <h1 className="text-3xl h1">Create Account</h1>
                <input
                  className="input"
                  required
                  type="text"
                  placeholder="first name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  name="firstName"
                />
                <input
                  className="input"
                  required
                  type="text"
                  placeholder="second name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  name="lastName"
                />
                <input
                  className="input"
                  required
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <input
                  className="input"
                  type="password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter, one digit, and one special character."
                  lang="en"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <input
                  className="input"
                  required
                  type="password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter, one digit, and one special character."
                  lang="en"
                  placeholder="confirm password"
                  value={passwordConfirm}
                  style={{
                    border: !isPasswordCorrect ? "1px solid #395c28" : "none",
                  }}
                  onChange={(event) => {
                    setPasswordConfirm(event.target.value);
                  }}
                />
                <button type="submit" className="button" disabled={loading}>
                  Sign Up
                </button>
              </form>
            </div>
            <div className="form-container sign-in-container ">
              <form action="" onSubmit={handleLogin} className="form">
                <h1 className="text-3xl h1">Sign in</h1>
                <div className="social-container">
                  <Link href="#" className="social">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </Link>
                  <Link href="#" className="social">
                    <i className="fa-brands fa-github"></i>
                  </Link>
                </div>
                <span className="span">or use your account</span>
                <input
                  className="input"
                  type="text"
                  placeholder="username"
                  required
                  value={usernameSignIn}
                  onChange={(event) => setUsernameSignIn(event.target.value)}
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  title="Password must contain at least 8 characters, including one lowercase letter, one uppercase letter, one digit, and one special character."
                  lang="en"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  value={passwordSignIn}
                  onChange={(event) => setPasswordSignIn(event.target.value)}
                />
                <Link href="#">Forgot your password?</Link>
                <button type="submit" className="button">
                  Sign In
                </button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className="text-3xl h1">Welcome Back!</h1>
                  <p className="p">
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button
                    className="ghost button"
                    id="signIn"
                    type="submit"
                    onClick={() => setIsLogin(true)}
                  >
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1 className="text-3xl h1">Hello, Friend!</h1>
                  <p className="p">
                    Enter your personal details and start journey with us
                  </p>
                  <button
                    disabled={loading}
                    className="ghost button"
                    id="signUp"
                    type="submit"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

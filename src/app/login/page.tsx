"use client";
import { useState } from "react";
import "./Login.css";
import "../../assets/bootstrap/css/bootstrap.min.css";
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import { useUser } from "@/lib/stores";
import { useRouter } from "next/navigation.js";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const changeUser = useUser((state) => state.changeUser);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("/api/login", data);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        router.push("/users");
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div
      className="container-fluid bg-gradient-primary fill-height"
      style={{ height: "100vh" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div className="flex-grow-1 bg-login-image nature-image"></div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Bem Vindo de Volta!</h4>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="email"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Insira o email..."
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="password"
                            id="exampleInputPassword"
                            placeholder="Senha"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="custom-control custom-checkbox small"></div>
                        </div>
                        <button className="btn btn-primary d-block btn-user w-100">
                          Login
                        </button>
                        {error && (
                          <div className="alert alert-danger mt-2" role="alert">
                            Email ou senha incorretos!
                          </div>
                        )}
                        <hr />
                        <a
                          className="btn btn-primary d-block btn-google btn-user w-100 mb-2"
                          role="button"
                        >
                          <div className="flex items-center justify-center">
                            <FaGoogle size={18} />
                            <span className="ml-2">Login com Google</span>
                          </div>
                        </a>
                        <a
                          className="btn btn-primary d-block btn-facebook btn-user w-100"
                          role="button"
                        >
                          <div className="flex items-center justify-center">
                            <FaFacebook size={18} />
                            <span className="ml-2">Login com Facebook</span>
                          </div>
                        </a>
                        <hr />
                      </form>
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Esqueceu a senha?
                        </a>
                      </div>
                      <div className="text-center">
                        <a className="small" href="register.html">
                          Crie uma conta!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

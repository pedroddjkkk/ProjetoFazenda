import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "../../redux/actions/userSlice.js";
import { apiBuscar } from "../../services/api.js";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(password);
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        const response = await apiBuscar("tab_user", "", data);

        console.log(response);

        if (response.data.length > 0) {
            const user = response.data[0];
            dispatch(changeUser(user));
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "/home";
        } else {
            alert("Usuário não encontrado");
        }
    };

    return (
        <div className="container-fluid bg-gradient-primary fill-height">
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
                                                <div className="mb-3"><input className="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Insira o email..." name="email" onChange={(target) => setEmail(target.target.value)} value={email}/></div>
                                                <div className="mb-3"><input className="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Senha" name="password" onChange={((target) => setPassword(target.target.value))} value={password} /></div>
                                                <div className="mb-3">
                                                    <div className="custom-control custom-checkbox small">
                                                    </div>
                                                </div><button className="btn btn-primary d-block btn-user w-100">Login</button>
                                                <hr /><a className="btn btn-primary d-block btn-google btn-user w-100 mb-2" role="button"><i className="fab fa-google"></i>&nbsp; Login com Google</a><a className="btn btn-primary d-block btn-facebook btn-user w-100" role="button"><i className="fab fa-facebook-f"></i>&nbsp; Login com Facebook</a>
                                                <hr />
                                            </form>
                                            <div className="text-center"><a className="small" href="forgot-password.html">Esqueceu a senha?</a></div>
                                            <div className="text-center"><a className="small" href="register.html">Crie uma conta!</a></div>
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

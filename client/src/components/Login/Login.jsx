

export default function Login() {

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-9 col-lg-12 col-xl-10">
                    <div class="card shadow-lg o-hidden border-0 my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-flex">
                                    <div class="flex-grow-1 bg-login-image" style={{backgroundImage: "url(../src/assets/img/dogs/image3.jpeg)"}}></div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h4 class="text-dark mb-4">Bem Vindo de Volta!</h4>
                                        </div>
                                        <form class="user">
                                            <div class="mb-3"><input class="form-control form-control-user" type="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Insira o email..." name="email" /></div>
                                            <div class="mb-3"><input class="form-control form-control-user" type="password" id="exampleInputPassword" placeholder="Senha" name="password" /></div>
                                            <div class="mb-3">
                                                <div class="custom-control custom-checkbox small">
                                                </div>
                                            </div><button class="btn btn-primary d-block btn-user w-100" type="submit">Login</button>
                                            <hr /><a class="btn btn-primary d-block btn-google btn-user w-100 mb-2" role="button"><i class="fab fa-google"></i>&nbsp; Login com Google</a><a class="btn btn-primary d-block btn-facebook btn-user w-100" role="button"><i class="fab fa-facebook-f"></i>&nbsp; Login com Facebook</a>
                                            <hr />
                                        </form>
                                        <div class="text-center"><a class="small" href="forgot-password.html">Esqueceu a senha?</a></div>
                                        <div class="text-center"><a class="small" href="register.html">Crie uma conta!</a></div>
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

const Login = () => {
    return (
    <div className="w-screen h-[80vh] flex items-center justify-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
          <p className="text-lg flex justify-center">Login</p>

          <label className="mt-2 label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          <label className="mt-2 label">Password</label>
          <input type="password" className="mb-2 input" placeholder="Password" />

          <button className="btn btn-neutral my-6">Submit</button>
        </fieldset>
    </div>
    )
}

export default Login;
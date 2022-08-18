

const Register = () => {

  return (
  
    <div>

      <form>
      <label htmlFor="email">Email</label>
      <input type='text' placeholder='Enter Email' name='email' required />

      <label htmlFor="userName">Username</label>
      <input type='text' placeholder='Enter userName' name='userName' required />


      <label htmlFor="password"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="password" required />

      <label htmlFor="password-repeat"><b>Repeat Password</b></label>
      <input type="password" placeholder="Repeat Password" name="password-repeat" required />

      <input type="button" value="Register" onclick="msg()" />
      <input type="button" value="Sign in" onclick="msg()" />




    </form>

  </div>



  )
}

export default Register 
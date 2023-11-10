<template>
  <div>
    <h1>Sign Up</h1>
    <div>
      <form action="">
        <div>
          <label for="text">Name</label>
          <input type="text" placeholder="John" />
          <label for="text">Last name</label>
          <input type="text" placeholder="Doe" />
          <label for="email">Email</label>
          <input type="email" placeholder="johndoe@mail.com" />
          <label for="password">Password</label>
          <input type="password" />
          <label for="passwordConfirmation">Confirm password</label>
          <input type="passwordConfirmation" />
        </div>
        <button>Register</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
};
</script>
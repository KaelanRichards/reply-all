<template>
  <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image
          v-show="isLoggingIn"
          class="logo"
          src="~/assets/images/NativeScript-Vue.png"
        />
        <Label v-show="isLoggingIn" class="header" text="REPLY_ALL" />
        <StackLayout class="input-field" marginBottom="25">
          <TextField
            class="input"
            hint="Email"
            keyboardType="email"
            autocorrect="false"
            autocapitalizationType="none"
            v-model="user.email"
            returnKeyType="next"
            @returnPress="focusPassword"
            fontSize="18"
          />
          <StackLayout class="hr-light" />
        </StackLayout>
        <StackLayout
          v-show="!isLoggingIn"
          class="input-field"
          marginBottom="25"
        >
          <TextField
            class="input"
            hint="User Name"
            autocorrect="false"
            autocapitalizationType="none"
            v-model="user.userName"
            returnKeyType="next"
            @returnPress="focusPassword"
            fontSize="18"
          />
          <StackLayout class="hr-light" />
        </StackLayout>
        <StackLayout
          v-show="!isLoggingIn"
          class="input-field"
          marginBottom="25"
        >
          <TextField
            class="input"
            hint="First Name"
            autocorrect="false"
            autocapitalizationType="none"
            v-model="user.firstName"
            returnKeyType="next"
            @returnPress="focusPassword"
            fontSize="18"
          />
          <StackLayout class="hr-light" />
        </StackLayout>
        <StackLayout
          v-show="!isLoggingIn"
          class="input-field"
          marginBottom="25"
        >
          <TextField
            class="input"
            hint="Last Name"
            autocorrect="false"
            autocapitalizationType="none"
            v-model="user.lastName"
            returnKeyType="next"
            @returnPress="focusPassword"
            fontSize="18"
          />
          <StackLayout class="hr-light" />
        </StackLayout>
        <StackLayout class="input-field" marginBottom="25">
          <TextField
            ref="password"
            class="input"
            hint="Password"
            secure="true"
            v-model="user.password"
            :returnKeyType="isLoggingIn ? 'done' : 'next'"
            @returnPress="focusConfirmPassword"
            fontSize="18"
          />
          <StackLayout class="hr-light" />
        </StackLayout>
        <StackLayout v-show="!isLoggingIn" class="input-field">
          <TextField
            ref="confirmPassword"
            class="input"
            hint="Confirm password"
            secure="true"
            v-model="user.confirmPassword"
            returnKeyType="done"
            fontSize="18"
          />
          <StackLayout class="hr-light" />
        </StackLayout>
        <Button
          :text="isLoggingIn ? 'Log In' : 'Sign Up'"
          @tap="submit"
          class="btn btn-primary m-t-20"
        />
        <Button
          v-show="isLoggingIn"
          :text="'\uf09a' + ' Facebook login'"
          @tap="loginFacebook"
          class="fab btn btn-active"
        />
        <Label
          v-show="isLoggingIn"
          text="Forgot your password?"
          class="login-label"
          @tap="forgotPassword"
        />
        <Label class="login-label sign-up-label" @tap="toggleForm">
          <FormattedString>
            <Span
              :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"
            />
            <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold" />
          </FormattedString>
        </Label>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>
<script>
import routes from "~/router";
import { LoadingIndicator } from "@nstudio/nativescript-loading-indicator";

const loader = new LoadingIndicator();

export default {
  data() {
    return {
      isLoggingIn: true,
      user: {
        email: "blake@gmail.com",
        password: "testtest",
        confirmPassword: "boobies",
        userName: "",
        firstName: "",
        lastName: "",
      },
    };
  },

  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },
    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
      }
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },
    async login() {
      loader.show(global.loaderOptions);

      this.$userService
        .login(this.user)
        .then((currentUser) => {
          this.$store.dispatch("setUser", JSON.parse(currentUser));
          loader.hide();
          this.$navigateTo(
            routes.home
            // { clearHistory: true },
            // { backstackVisible: false }
          );
        })
        .catch((err) => {
          loader.hide();
          console.log(err);
          this.alert("Unfortunately we could not find your account.");
        });
    },
    loginFacebook() {
      //loader.show();//Don't use this for facebook logins, as the indicator covers the UI on IOS
      this.$userService
        .loginFacebook(this.user)
        .then(() => {
          //loader.hide();
          this.$navigateTo(
            routes.home
            // { clearHistory: true },
            // { backstackVisible: false }
          );
        })
        .catch((err) => {
          //loader.hide();
          console.error(err);
          this.alert(err);
        });
    },
    register() {
      var validator = require("email-validator");
      if (!validator.validate(this.user.email)) {
        loader.hide();
        this.alert("Please enter a valid email address.");
        return;
      }
      if (this.user.password != this.user.confirmPassword) {
        loader.hide();
        this.alert("Your passwords do not match.");
        return;
      }
      if (this.user.password.length < 6) {
        loader.hide();
        this.alert("Your password must at least 6 characters.");
        return;
      }
      this.$userService
        .register(this.user)
        .then((user) => {
          this.alert("Your account was successfully created. Welcome!", user);
          this.isLoggingIn = true;
          loader.hide();
        })
        .catch((err) => {
          console.error(err);
          loader.hide();
          this.alert(err);
        });
    },
    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message:
          "Enter the email address you used to register for APP NAME to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel",
      }).then((data) => {
        if (data.result) {
          loader.show(global.loaderOptions);
          this.$userService
            .resetPassword(data.text.trim())
            .then(() => {
              loader.hide();
              this.alert(
                "Your password was successfully reset. Please check your email for instructions on choosing a new password."
              );
            })
            .catch(() => {
              loader.hide();
              this.alert(err);
            });
        }
      });
    },
    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },
    alert(message) {
      return alert({
        title: "APP NAME",
        okButtonText: "OK",
        message: message,
      });
    },
  },
  created() {
    this.$promptService
      .getAllPremadePrompts()
      .then((prompts) => {
        this.$store.dispatch("setPrompts", prompts);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}
.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}
.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}
.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: rgb(51, 51, 206);
}
.input-field {
  margin-bottom: 25;
}
.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}
.input-field .input {
  font-size: 54;
}
.btn-primary {
  height: 50;
  margin: 30 5 15 5;
  background-color: rgb(51, 51, 206);
  color: white;
  border-radius: 5;
  font-size: 20;
  font-weight: 600;
}
.login-label {
  horizontal-align: center;
  color: #a8a8a8;
  font-size: 16;
}
.sign-up-label {
  margin-bottom: 20;
}
.bold {
  color: #000000;
}
</style>

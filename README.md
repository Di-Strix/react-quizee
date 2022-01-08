# React quizee
## How to setup
  1. Clone project repo
  2. Create `.env.local` file in the root of the project
  3. Set the following env variables:
      ```
      REACT_APP_API_KEY=
      REACT_APP_AUTH_DOMAIN=
      REACT_APP_DATABASE_URL=
      REACT_APP_PROJECT_ID=
      REACT_APP_STORAGE_BUCKET=
      REACT_APP_MESSAGING_SENDER_ID=
      REACT_APP_APP_ID=
      
      REACT_APP_RE_CAPTCHA_V3_PUBLIC_KEY=
      
      REACT_APP_FUNCTIONS_USE_EMULATOR= // true or false
      REACT_APP_FUNCTIONS_EMULATOR_HOST=
      REACT_APP_FUNCTIONS_EMULATOR_PORT=
      ```
      You can get your app's firebase config from you project's settings.

      How to setup appCheck: https://firebase.google.com/docs/app-check
  4. Clone [quizee cloud functions](https://github.com/Di-Strix/quizee-cloud-functions) repo
  5. Run quizee cloud functions (read README in the corresponding repo)
  6. Run React quizee
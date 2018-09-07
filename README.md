# GymLund Chatbot

Based on (Pilar Figueroas)[https://medium.com/crowdbotics/how-to-create-your-very-own-facebook-messenger-bot-with-dialogflow-and-node-js-in-just-one-day-f5f2f5792be5] instructions.

1. First you need to create a page. Go to (facebook.com/pages/create)[https://facebook.com/pages/create]. Choose a category, subcategory and click Get Started.
2. After that you’ll need to create an app. Go to (developers.facebook.com/quickstarts)[https://developers.facebook.com/quickstarts], give your Facebook app a name, type in your e-mail, and then click the “Create App ID” button.
3. After creating the App, you have to select a product. Click the“Messenger” icon and then click on the “Set Up” button. This will redirect you to the Messenger Platform.
4. Once you’re there, you must locate the “Token Generation” section. Select the page you already created, and it will give you a Page Access Token that we will use later.
5. Below this section is the Webhooks section. Click on “Setup Webhooks” and it will show you a popup window, where you’ll need to fill out the following:
* Callback URL: With your ngrok URL.
* Verify Token: The string for validation that you already chose from controller/verification.js.
* Subscription Fields: Choose messages and messaging_postbacks.
6. Click “Verify and Save” button.
7. 
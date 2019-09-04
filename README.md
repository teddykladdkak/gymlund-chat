# GymLund Chatbot
## What is this?
This is a chatbot for Pokemon Go facebook messenger groups, it uses the GymLund.tk library to listen to users, if "Gym Name" is written, the bottom will respond to coordinates and if the gym is EX-raid eligible.

## Demo
[![alt text](https://raw.githubusercontent.com/teddykladdkak/gymlund-chat/master/video.png "Facebook Messenger Chatbot GymLund.tk - Demo")](https://youtu.be/rhjMqUI823A)

## Fast installation based on [Pilar Figueroas](https://medium.com/crowdbotics/how-to-create-your-very-own-facebook-messenger-bot-with-dialogflow-and-node-js-in-just-one-day-f5f2f5792be5) instructions.
1. First you need to create a page. Go to (facebook.com/pages/create)[https://facebook.com/pages/create]. Choose a category, subcategory and click Get Started.
2. After that you’ll need to create an app. Go to (developers.facebook.com/quickstarts)[https://developers.facebook.com/quickstarts], give your Facebook app a name, type in your e-mail, and then click the “Create App ID” button.
3. After creating the App, you have to select a product. Click the“Messenger” icon and then click on the “Set Up” button. This will redirect you to the Messenger Platform.
4. Once you’re there, you must locate the “Token Generation” section. Select the page you already created, and it will give you a Page Access Token that we will use later.
5. Below this section is the Webhooks section. Click on “Setup Webhooks” and it will show you a popup window, where you’ll need to fill out the following:
* Callback URL: With your ngrok URL.
* Verify Token: The string for validation that you already chose from controller/verification.js.
* Subscription Fields: Choose messages and messaging_postbacks.
6. Click “Verify and Save” button.
7. Find the “Roles” section and click on it. Then in the “Testers” section, click “Add Testers” button, it will throw you a popup window where you can add the Facebook ID or username for the person you want test your bot. Finally, click “Submit” button and the person can send a message to your bot throw your Facebook page.
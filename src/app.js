// src/app.js
import dotenv from 'dotenv';
dotenv.config();

import { createUserFragment } from './api';
import { Auth, getUser } from './auth';
import { getUserFragments } from './api';  // <- import added here

const fragmentForm = document.querySelector('#fragmentForm');
const fragmentText = document.querySelector('#fragmentText');

fragmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = await getUser();
    if (!user) {
        console.error('User is not authenticated');
        return;
    }

    const fragmentData = {
        text: fragmentText.value,
        // ... any other data you want to send
    };

    try {
        await createUserFragment(user, fragmentData);
        alert('Fragment stored successfully!');
    } catch (err) {
        alert('Failed to store fragment. Please try again.');
    }
});
async function init() {
  // Get our UI elements
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');

  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    return;
  }

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector('.username').innerText = user.username;

  // Disable the Login button
  loginBtn.disabled = true;

  // Call the getUserFragments function now that we have a user
  getUserFragments(user);  // <- function call added here
}

// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);

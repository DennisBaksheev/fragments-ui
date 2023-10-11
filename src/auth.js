import { Amplify, Auth } from 'aws-amplify';

// Configure our Auth object to use our Cognito User Pool
Amplify.configure({
  Auth: {
    // Amazon Region. We can hard-code this (we always use the us-east-1 region)
    region: 'us-east-1',

    // Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_3aBCMHcjR',
    userPoolWebClientId: '4ks4gopjl273115is1rh76r5bi',

    // Hosted UI configuration
    oauth: {
      // Amazon Hosted UI Domain
      domain: 'dbaksheev-fragments.auth.us-east-1.amazoncognito.com',

      // These scopes must match what you set in the User Pool for this App Client
      scope: ['email', 'phone', 'openid'],

      // Callback and Redirect URLs
      redirectSignIn: 'http://localhost:1234',
      redirectSignOut: 'http://localhost:1234',

      // We're using the Access Code Grant flow (i.e., `code`)
      responseType: 'code',
    },
  },
});

/**
 * Get the authenticated user
 * @returns Promise<user>
 */
async function getUser() {
  try {
    // Get the user's info, see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();

    // Get the user's username
    const username = currentAuthenticatedUser.username;

    // If that didn't throw, we have a user object, and the user is authenticated
    console.log('The user is authenticated', username);

    // Get the user's Identity Token, which we'll use later with our
    // microservice. See discussion of various tokens:
    // https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html
    const idToken = currentAuthenticatedUser.signInUserSession.idToken.jwtToken;
    const accessToken = currentAuthenticatedUser.signInUserSession.accessToken.jwtToken;

    // Return a simplified "user" object
    return {
      username,
      idToken,
      accessToken,
      // Include a simple method to generate headers with our Authorization info
      authorizationHeaders: (type = 'application/json') => {
        const headers = { 'Content-Type': type };
        headers['Authorization'] = `Bearer ${idToken}`;
        return headers;
      },
    };
  } catch (err) {
    console.log(err);
    // Unable to get user, return `null` instead
    return null;
  }
}

export { Auth, getUser };
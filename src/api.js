// Define the API URL for the fragments microservice, defaulting to localhost:8080
const apiUrl = process.env.API_URL || 'http://localhost:8080';



/**
 * Fetches all fragments associated with a given user from the fragments microservice.
 * Requires the user to be authenticated and have an `idToken`.
 * 
 * @param {Object} user - The authenticated user object.
 * @param {boolean} expand - Flag to determine if additional data should be included in the response.
 * @returns {Promise<Object>} The fetched data or an error message.
 */




export async function getUserFragments(user, expand = false) {
  console.log('Requesting user fragments data...');
  console.log('apiUrl', apiUrl);
  console.log('expand', expand);

  try {
    const res = await fetch(
      `${apiUrl}/v1/fragments${expand ? '?expand=1' : ''}`,
      {
        headers: user.authorizationHeaders(), // Set authorization headers for the request.
      }
    );
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user fragments data', { data });
    return data;
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

/**
 * Fetches specific fragment data by its ID.
 * 
 * @param {Object} user - The authenticated user object.
 * @param {string} fragmentId - The ID of the fragment to fetch.
 * @param {string} ext - Optional extension to specify the data format.
 * @returns {Promise<string>} The fetched data in string format.
 */
export async function getFragmentDataById(user, fragmentId, ext) {
  console.log('Getting fragment data by id...');
  try {
    const res = await fetch(
      `${apiUrl}/v1/fragments/${fragmentId}${ext ? `.${ext}` : ''}`,
      {
        headers: user.authorizationHeaders(), // Set authorization headers for the request.
      }
    );
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    console.log('Got user fragments by Id res', res);
    if (res.headers.get('Content-Type').includes('application/json')) {
      const data = await res.json();
      console.log('*** data', data);
      return JSON.stringify(data);
    } else {
      return await res.text();
    }
  } catch (err) {
    console.error(`Unable to call GET ${apiUrl}/v1/fragments/${fragmentId}`, { err });
  }
}

/**
 * Fetches fragment information by its ID.
 * 
 * @param {Object} user - The authenticated user object.
 * @param {string} fragmentId - The ID of the fragment to fetch information for.
 * @returns {Promise<Object>} The fetched fragment information.
 */
export async function getFragmentById(user, fragmentId) {
  console.log('Getting fragment by id info...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}/info`, {
      headers: user.authorizationHeaders(), // Set authorization headers for the request.
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('JSON data:', data);
    return data;
  } catch (err) {
    console.error(`Unable to call GET ${apiUrl}/v1/fragments/${fragmentId}/info`, { err });
  }
}

/**
 * Submits a new fragment to the fragments microservice.
 * 
 * @param {Object} user - The authenticated user object.
 * @param {string} fragment - The fragment data to submit.
 * @param {string} dataType - The type of data being submitted.
 * @returns {Promise<Object>} The response from the submission.
 */
export async function submitFragment(user, fragment, dataType) {
  console.log('Submitting fragment data...');
  console.log('apiUrl', apiUrl);
  console.log('dataType', dataType);
  console.log('fragment', fragment);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: 'POST',
      headers: user.authorizationHeaders(dataType), // Set authorization headers and content type for the request.
      body: fragment,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Submitted fragment data', { data });
    return data;
  } catch (err) {
    console.error('Unable to call POST /v1/fragment', { err });
  }
}

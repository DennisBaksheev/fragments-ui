// const apiUrl = process.env.API_URL || 'http://localhost:8080';
const apiUrl = '/api';


//  GET /v1/fragments?expand=1

export async function listFragments(user) {
  console.log('GET /v1/fragments?expand=1');

  return await fetch(`${apiUrl}/v1/fragments?expand=1`, {
    method: 'GET',
    headers: user.authorizationHeaders(),
  })
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }

      return res.json();
    })
    .then((data) => {
      if (data.fragments.length > 0) {
        console.log(`User has ${data.fragments.length} fragment(s): `, { data });
      } else {
        console.log(`User has no saved fragments`);
      }

      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}


//  POST /v1/fragments

export async function postFragment(user, content, fragmentType) {
  console.log('POST /v1/fragments');

  return await fetch(`${apiUrl}/v1/fragments`, {
    method: 'POST',
    headers: {
      Authorization: user.authorizationHeaders().Authorization,
      'Content-Type': fragmentType,
    },
    body: content,
  })
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }
      return res.json();
    })
    .then((data) => {
      console.log('Success in creating new fragment', { data });
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}


// GET /v1/fragments/:id
 
export async function viewFragment(user, fragmentIdWithExt) {
  console.log(`GET /v1/fragments/${fragmentIdWithExt}`);

  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentIdWithExt}`, {
      method: 'GET',
      headers: user.authorizationHeaders(),
    });

    if (!res.ok) {
      throw await res.json();
    }

    let data;
    const fragmentType = res.headers.get('Content-Type');

    if (fragmentType.startsWith('text/') || fragmentType === 'application/json') {
      data = await res.text(); 
    } else if (fragmentType.startsWith('image/')) {
      const blob = await res.blob();
      data = URL.createObjectURL(blob);
    }

    console.log('Success in retrieving fragment data: ', { data });

    return { data, fragmentType };
  } catch (err) {
    console.error(err);
    throw err;
  }
}


  // PUT /v1/fragments/:id
 
export async function updateFragment(user, content, fragmentId, fragmentType) {
  console.log('PUT /v1/fragments');

  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}`, {
      method: 'PUT',
      headers: {
        Authorization: user.authorizationHeaders().Authorization,
        'Content-Type': fragmentType,
      },
      body: content,
    });

    if (!res.ok) {
      throw await res.json();
    }

    const data = await res.json();

    console.log('Success in updating fragment data: ', { data });

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


//  DELETE /v1/fragments/:id
export async function deleteFragment(user, id) {
  console.log('DELETE /v1/fragments');

  return await fetch(`${apiUrl}/v1/fragments/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: user.authorizationHeaders().Authorization,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }
      return res.json();
    })
    .then((data) => {
      console.log('Success in deleting fragment: ', { data });
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}
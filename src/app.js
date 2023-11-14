import { Auth, getUser } from './auth';

import {
  getUserFragments,
  getFragmentDataById,
  getFragmentById,
  submitFragment
  ,
} from './api';

// Initialize the application
async function init() {
  // Get UI elements
  const userSection = document.querySelector('#user');
  const username = document.querySelector('#username');
  const userGreeting = document.querySelector('#user-greeting');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  const dataSubmit = document.querySelector('#data-submit');
  const data = document.querySelector('#data');
  const dataTypeSelect = document.querySelector('#data-type');
  const getData = document.querySelector('#get-data');
  const expandCheckbox = document.querySelector('#expand');
  const showFragmentList = document.querySelector('.show-fragment-list');
  const fragmentTable = document.querySelector('#fragment-table');
  const fragmentTableBody = document.querySelector('#fragment-table tbody');

  // Event handler for login button
  loginBtn.onclick = () => {
    console.log('Logging in...');
    Auth.federatedSignIn();
  };

  // Event handler for logout button
  logoutBtn.onclick = () => {
    console.log('Logging out...');
    Auth.signOut();
  };

  // Check if user is signed in
  const user = await getUser();
  if (!user) {
    logoutBtn.disabled = true;
    return;
  }

  // Fetch user fragments
  let res = await getUserFragments(user);
  console.log({ user });

  // Update UI with user info
  userSection.hidden = false;
  userGreeting.hidden = false;
  username.innerText = user.username;
  loginBtn.disabled = true;

  // Event handler for copy button
  const copyBtn = document.querySelector('#copy-btn');
  const fakeJSON = document.querySelector('#fake-json');
  copyBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText(fakeJSON.innerText);
      copyBtn.innerText = 'Copied!';
      setTimeout(() => {
        copyBtn.innerText = 'Copy';
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  // Event handler for data submission
  dataSubmit.onclick = async () => {
    const selectedDataType = dataTypeSelect.value;
    console.log('Submitting data...');
    const res = await submitFragment(user, data.value, selectedDataType);
    console.log('>>> res', res);
    if (!res) {
      alert('Error! Your data was not submitted. Please make sure data type is supported');
    }
  };

  // Event handler for fetching data
  getData.onclick = async () => {
    console.log('Getting data...');
    res = await getUserFragments(user, expandCheckbox.checked);
    updateFragmentList(res.fragments);
  };

  // Update fragment list in UI
  function updateFragmentList(fragments) {
    // Clear existing list
    while (showFragmentList.firstChild) {
      showFragmentList.removeChild(showFragmentList.firstChild);
    }

    // Generate HTML for fragment list
    const fragmentRows = generateFragmentRows(fragments);
    fragmentTableBody.innerHTML = fragmentRows;
    showFragmentList.appendChild(fragmentTable);
    showFragmentList.hidden = false;

    // Initialize modals
    initializeModals();
  }

  // Generate HTML rows for each fragment
  function generateFragmentRows(fragments) {
    return fragments.length > 0
      ? fragments
          .map((fragment) => {
            let fragmentId = expandCheckbox.checked ? fragment.id : fragment;
            return generateFragmentRow(fragment, fragmentId);
          })
          .join('')
      : '<tr><td>No fragments found</td></tr>';
  }

  
  
  // Generate a single row for a fragment
  function generateFragmentRow(fragment, fragmentId) {
    return `<tr>...</tr>`; // Simplified for brevity
  }

  
  // Initialize modal functionality
  function initializeModals() {
    // Add event listeners for modal triggers
    setupModalTriggers();
    // Add event listeners for modal close actions
    setupModalCloseActions();
  }

  // Setup modal triggers
  function setupModalTriggers() {
    // Code to setup modal triggers
  }

  // Setup modal close actions
  function setupModalCloseActions() {
    // Code to setup modal close actions
  }
}

// Wait for DOM to be ready
addEventListener('DOMContentLoaded', init);


// Helper function to convert date to US format
const convertDateUS = (dateString) => {
  let date = new Date(dateString);
  return date.toLocaleString('en-US');
};

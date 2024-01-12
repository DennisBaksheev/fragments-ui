# Fragments-UI 


## Overview
Fragments UI is the front-end web application for the Fragments Microservice. It provides a user-friendly interface for managing various types of fragments, including text, images, and JSON data.

## Features

### Docker Integration
- **Dockerfile and .dockerignore**: Included in the GitHub repository.
- **Docker Best Practices**: The Dockerfile adheres to best practices for image creation.
- **Multi-Stage Docker Build**: Ensures the production Docker image is as small as possible.
- **Nginx Usage**: The final layer uses Nginx to serve the static website, instead of Node.js.
- **Docker Hub Repository**: The Docker image is available publicly under the user's Docker Hub account.

### User Functionality
- **Fragment Creation**: Users can create new fragments, specifying the type via a dropdown or textbox. Supports text (`text/*`) and JSON (`application/json`) types.
- **List of Fragments**: Authenticated users can view a list of their existing fragments along with all metadata.

### Development and Testing Environment
- **Repository Setup**: The `fragments-ui` git repository is set up correctly.
- **Development Tools**: Includes npm, eslint, prettier, and necessary scripts.
- **Basic Web Application**: Functional for manual testing of the API server.
- **AWS Cognito Integration**: Hosted Auth is set up correctly for user authentication/authorization.
- **Flexible Backend Configuration**: The web app can be configured to use different back-end API servers (e.g., localhost for development and EC2 instance for production).
- **Fragment Creation and Storage**: Users can create simple text fragments that are stored in the fragments server.
- **Local and Cloud Integration**: The web app running on localhost can use Amazon Cognito and the EC2 hosted backend server.

## Installation and Setup

### Docker Setup
1. Clone the repository.
2. Build the Docker image: `docker build -t fragments-ui .`
3. Run the container: `docker run -p 80:80 fragments-ui`

### Local Development
1. Install dependencies: `npm install`
2. Start the development server: `npm start`

## Usage

### Viewing Fragments
1. Log in to view your fragments.
2. Navigate to the fragments list section to view all your fragments and their metadata.

### Updating a Fragment
To update an existing fragment:
1. **Inspect and Get Fragment ID**:
   - Right-click on the page and select "Inspect" to open the Web Developer console.
   - Navigate to the "Console" tab and locate the logged object that represents your fragment.
   - Copy the `id` value from the object (e.g., `"3173aad6-a0ec-4e94-b228-db911bd5579c"`).

2. **Enter Fragment ID for Retrieval or Conversion**:
   - Paste the copied ID into the "Get or Convert and Display a Fragment by ID" field on the Fragments UI page.
   - You may also add extensions like `.txt`, `.html`, `.jpg` for conversion purposes.
   - Click the "View" button to retrieve and display the fragment.

3. **Update Fragment Content**:
   - Modify the fragment content in the "Fragment Display" field as needed.
   - Click the "Update" button to save the changes.

### Deleting a Fragment
To delete a fragment:
1. **Navigate to User Fragments Section**: View the list of your created fragments under the "User Fragments" section of the Fragments UI.
2. **Select Fragment for Deletion**:
   - Locate the fragment you wish to delete.
   - Each fragment entry will have a corresponding "Delete" button.
   - Click the "Delete" button next to the fragment you want to remove.


## Deployment and Hosting

The Fragments UI is hosted on Netlify and configured to interact with the Fragments Microservice backend hosted on AWS. The following steps were taken to ensure smooth integration between the front-end and back-end services:

1. **Netlify Proxy Setup**: Implemented a proxy in Netlify (`/api/*`) to forward requests to the AWS Load Balancer. This setup helps in resolving mixed content issues and abstracts the API endpoint configuration.
2. **Environment Variables**: Configured essential environment variables in Netlify for seamless connection to the AWS backend.
3. **Secure Redirects**: Updated the OAuth redirect URLs to point to the Netlify hosted front-end, ensuring secure authentication flow with AWS Cognito.

Visit the hosted front-end application here: [Fragments UI on Netlify](https://incandescent-madeleine-e2b4c2.netlify.app/)

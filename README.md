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

### Creating a Fragment
1. Log in using AWS Cognito.
2. Navigate to the fragment creation section.
3. Enter the fragment data and select the type.
4. Submit the fragment.

### Viewing Fragments
1. Log in to view your fragments.
2. Navigate to the fragments list section to view all your fragments and their metadata.

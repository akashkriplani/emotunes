# Emotunes - Facial Emotion Recognition with React 18 and TypeScript

This is a simple web application that uses facial emotion recognition to detect emotions from a user's face. It uses face-api.js for facial emotion recognition and the YouTube Data API v3 to get a list of songs by random artists. The application analyzes the user's facial expression and recommends a song that matches their mood.

The application also uses p5.js, react-p5, @tensorflow/tfjs, @tensorflow/tfjs-converter, @tensorflow/tfjs-core, @tensorflow/tfjs-node to power its facial emotion recognition feature.

A working version of the application is available at [Emotunes](https://akashkriplani.github.io/emotunes).

## Dependencies

The following dependencies are required to build and run the application:

- [React](https://reactjs.org/): A JavaScript library for building user interfaces, which provides a declarative approach to building UIs and encourages component-based architecture.

- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript, which provides static type checking and other features to help catch errors before runtime.

- [face-api.js](https://github.com/justadudewhohacks/face-api.js): A JavaScript API for face detection and recognition in the browser, which provides a range of functions for analyzing facial features and emotions.

- [@tensorflow/tfjs](https://www.tensorflow.org/js): A JavaScript library for machine learning, which provides a range of tools and functions for training and running models in the browser.

- [@tensorflow/tfjs-converter](https://www.tensorflow.org/js/guide/conversion): A library for converting trained models from various machine learning frameworks (such as TensorFlow and Keras) to the TensorFlow.js format.

- [@tensorflow/tfjs-core](https://www.tensorflow.org/js/guide/core_concepts): The core library of TensorFlow.js, which provides low-level functions for building and training machine learning models.

- [@tensorflow/tfjs-node](https://www.tensorflow.org/js/guide/nodejs): A Node.js library for running TensorFlow.js models on the server side.

- [p5.js](https://p5js.org/): A JavaScript library for creative coding, which provides a range of functions and tools for creating interactive graphics and animations.

- [react-p5](https://www.npmjs.com/package/react-p5): A React wrapper for p5.js, which provides a simple way to integrate p5.js sketches into a React application.

- [gh-pages](https://github.com/tschaub/gh-pages): A tool for publishing a static website to a GitHub Pages repository, which provides a simple way to host and share your application online.

- [Node.js](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 JavaScript engine, which provides a range of tools and libraries for building server-side applications. [Node v18.15.0](https://nodejs.org/dist/v18.15.0/) is recommended.

- [npm](https://www.npmjs.com/): A package manager for the Node.js ecosystem, which provides a range of tools for installing, updating, and managing dependencies.

## Installation

To install the dependencies and start the application, follow these steps:

1. Clone the repository to your local machine.

2. Install Node.js and npm, if you haven't already. Works best with Node v18.15.0.

3. Open a terminal window and navigate to the project directory.

4. Run `npm install` to install the required dependencies.

5. Run `npm start` to start the development server.

6. Open a web browser and navigate to `http://localhost:3000` to view the application.

7. Add REACT_APP_YOUTUBE_API_KEY from [Google Developers Console](https://console.developers.google.com/) in the .env file at the root of your project directory to make the YouTube search work.

## Building the project

Running `npm run build` builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

Emotunes is deployed using gh-pages. To deploy the application to your own gh-pages site, follow these steps:

1. Update the `homepage` field in `package.json` to match your own repository URL.
2. Run `npm run deploy`.

This will create a production build of the application and deploy it to your gh-pages site.

## Built With

- React 18
- TypeScript
- face-api.js
- YouTube Data API v3
- p5.js
- react-p5
- @tensorflow/tfjs
- @tensorflow/tfjs-converter
- @tensorflow/tfjs-core
- @tensorflow/tfjs-node

## Contributing

If you want to contribute to Emotunes, feel free to fork the repository and submit a pull request. Any contributions are welcome!

## Authors

- [Akash Kriplani](https://github.com/akashkriplani)
- [Saurav Dubey](https://github.com/sauravn10)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Usage

To use the application, simply open it in a web browser and allow access to your device's camera. The application will use face detection and recognition to analyze your facial features and detect your emotions in real-time.

# Social Engineering Quiz Project

This project is a web-based quiz designed to assess an individual's susceptibility to social engineering tactics. It presents users with simulated scenarios and questions that reflect common social engineering techniques.

**Disclaimer:** This project is intended for educational purposes only. The results should not be considered a definitive measure of an individual's vulnerability. Use this tool to increase awareness and understanding of social engineering risks.

---

## Getting Started

To get this project up and running, follow these steps:

1.  **Prerequisites:** Make sure you have **Node.js** and **npm** installed on your system. You can download them from [Node.js](https://nodejs.org) and [npm](https://npmjs.com) respectively.

2.  **Install Dependencies:** This project has dependencies in multiple directories. You'll need to run `npm install` in the **root directory**, the `client` directory, and the `client-admin` directory.

    Navigate to each directory using the `cd` command and then run the installation command:

    ```bash
    # From the project root
    npm install

    # Navigate to client and install
    cd client
    npm install

    # Navigate to client-admin and install
    cd ../client-admin
    npm install
    ```

    _Note: `cd ..` will take you up one directory if you need to go back to the root or a different sub-directory._

---

## Running the Applications

Once the dependencies are installed, you can start the different parts of the application:

### Server

To start the backend server, navigate to the **root directory** of the project and run:

```bash
npm run start:server
```

### Client

To start the frontend quiz page, navigate to the **root directory** of the project and run:

```bash
npm run start:client
```

### Admin Portal

To start the administrative portal, navigate to the **root directory** of the project and run:

```bash
npm run start:client-admin
```

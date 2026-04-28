// Front-end unit testing for doLogin()

const { doLogin } = require('../js/code.js');

beforeEach(() => {
    // Reset DOM and global variables before each test
    document.body.innerHTML = `
        <input id="loginName" value="testuser" />
        <input id="loginPassword" value="password123" />
        <div id="loginResult"></div>
    `;

    global.userId = 0;
    global.firstName = "";
    global.lastName = "";

    // Mock document.cookie storage
    let cookieStore = "";
    Object.defineProperty(document, "cookie", {
        get: () => cookieStore,
        set: (value) => { cookieStore = value; },
        configurable: true
    });

    // Mock XMLHttpRequest
    global.XMLHttpRequest = jest.fn(() => ({
        open: jest.fn(),
        setRequestHeader: jest.fn(),
        send: jest.fn(),
        onreadystatechange: null,
        readyState: 4,
        status: 200,
        responseText: "",
    }));
});

// Helper to simulate a server response
function simulateResponse(status, responseBody) {
    const xhrMock = XMLHttpRequest.mock.results[0].value;
    xhrMock.status = status;
    xhrMock.responseText = JSON.stringify(responseBody);
    xhrMock.readyState = 4;
    if (xhrMock.onreadystatechange) {
        xhrMock.onreadystatechange();
    }
}

describe("doLogin() - Front-End Unit Tests", () => {
    test("Successful login saves the user cookie", () => {
        doLogin();
        simulateResponse(200, { id: 42, firstName: "John", lastName: "Doe" });

        expect(document.cookie).toContain("firstName=John");
        expect(document.cookie).toContain("lastName=Doe");
        expect(document.cookie).toContain("userId=42");
        expect(document.getElementById("loginResult").innerHTML).toBe("");
    });

    test("Failed login (userId < 1) shows error message and does not save cookie", () => {
        doLogin();
        simulateResponse(200, { id: 0, firstName: "", lastName: "" });

        expect(document.getElementById("loginResult").innerHTML).toBe("User/Password combination incorrect");
        expect(document.cookie).toBe("");
    });

    test("HTTP error status (e.g., 500) does nothing and shows no error message", () => {
        doLogin();
        simulateResponse(500, {});

        expect(document.getElementById("loginResult").innerHTML).toBe("");
        expect(document.cookie).toBe("");
    });

    test("Network exception during XHR send displays error message", () => {
        // Override XMLHttpRequest to throw when send() is called
        global.XMLHttpRequest = jest.fn(() => ({
            open: jest.fn(),
            setRequestHeader: jest.fn(),
            send: jest.fn(() => { throw new Error("Network failure"); }),
            onreadystatechange: null,
        }));

        doLogin();

        expect(document.getElementById("loginResult").innerHTML).toBe("Network failure");
        expect(document.cookie).toBe("");
    });
});

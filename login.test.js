// login.test.js
const fs = require('fs');
const path = require('path');

const LOGIN_PATH = path.join(__dirname, 'login.js');

function buildDOM() {
    document.body.innerHTML = `
        <form id="loginForm">
            <input id="username" />
            <input id="password" />
            <input type="checkbox" id="rememberMe" />
        </form>
        <div id="usernameError" style="display:none"></div>
        <div id="passwordError" style="display:none"></div>
        <div id="successMessage" style="display:none"></div>
        <div id="errorMessage" style="display:none"></div>
    `;
}

function loadLoginScript() {
    const code = fs.readFileSync(LOGIN_PATH, 'utf8');
    const script = document.createElement('script');
    script.textContent = code;
    document.body.appendChild(script);
}

describe('login.js', () => {
    let originalLocation;

    beforeEach(() => {
        // reset DOM and storage
        buildDOM();
        localStorage.clear();

        // mock window.location to be writable
        originalLocation = window.location;
        try { delete window.location; } catch (e) {}
        window.location = { href: '' };

        // ensure fresh module execution if needed
        jest.resetModules();
        jest.useRealTimers();
    });

    afterEach(() => {
        // restore location
        try { delete window.location; } catch (e) {}
        window.location = originalLocation;
        jest.clearAllTimers();
        jest.restoreAllMocks();
    });

    test('prevents default and shows username error when username too short', () => {
        buildDOM();
        document.getElementById('username').value = 'ab';
        document.getElementById('password').value = 'validPass';
        loadLoginScript();

        const ev = { preventDefault: jest.fn() };
        window.handleLogin(ev);

        expect(ev.preventDefault).toHaveBeenCalled();
        expect(document.getElementById('usernameError').style.display).toBe('block');
        expect(localStorage.getItem('authToken')).toBeNull();
    });

    test('shows password error when password too short', () => {
        buildDOM();
        document.getElementById('username').value = 'abc';
        document.getElementById('password').value = '123';
        loadLoginScript();

        const ev = { preventDefault: jest.fn() };
        window.handleLogin(ev);

        expect(ev.preventDefault).toHaveBeenCalled();
        expect(document.getElementById('passwordError').style.display).toBe('block');
        expect(localStorage.getItem('authToken')).toBeNull();
    });

    test('successful login with rememberMe=true stores rememberedUsername, authToken and redirects after timeout', () => {
        buildDOM();
        document.getElementById('username').value = 'admin';
        document.getElementById('password').value = 'password123';
        document.getElementById('rememberMe').checked = true;

        loadLoginScript();

        jest.useFakeTimers();
        const ev = { preventDefault: jest.fn() };
        window.handleLogin(ev);

        expect(document.getElementById('successMessage').style.display).toBe('block');
        expect(document.getElementById('successMessage').textContent).toContain('Login successful');
        expect(localStorage.getItem('rememberedUsername')).toBe('admin');
        expect(localStorage.getItem('authToken')).not.toBeNull();
        expect(localStorage.getItem('username')).toBe('admin');

        // advance timer and assert redirect
        jest.advanceTimersByTime(1500);
        expect(window.location.href).toBe('index.html');
        jest.useRealTimers();
    });

    test('successful login with rememberMe=false removes rememberedUsername', () => {
        buildDOM();
        // pre-populate remembered username
        localStorage.setItem('rememberedUsername', 'olduser');

        document.getElementById('username').value = 'user';
        document.getElementById('password').value = 'user1234';
        document.getElementById('rememberMe').checked = false;

        loadLoginScript();

        const ev = { preventDefault: jest.fn() };
        window.handleLogin(ev);

        expect(document.getElementById('successMessage').style.display).toBe('block');
        expect(localStorage.getItem('rememberedUsername')).toBeNull();
    });

    test('failed login shows error message', () => {
        buildDOM();
        document.getElementById('username').value = 'unknown';
        document.getElementById('password').value = 'badpass';
        document.getElementById('rememberMe').checked = false;

        loadLoginScript();

        const ev = { preventDefault: jest.fn() };
        window.handleLogin(ev);

        expect(document.getElementById('errorMessage').style.display).toBe('block');
        expect(document.getElementById('errorMessage').textContent).toContain('Invalid username or password');
        expect(localStorage.getItem('authToken')).toBeNull();
    });

    test('generateToken returns base64 encoded username prefix', () => {
        buildDOM();
        loadLoginScript();

        const token = window.generateToken('testuser');
        const decoded = atob(token);
        expect(decoded.startsWith('testuser:')).toBe(true);
    });

    test('checkAuthentication redirects when authToken exists', () => {
        buildDOM();
        localStorage.setItem('authToken', 'some-token');
        loadLoginScript();

        window.checkAuthentication();
        expect(window.location.href).toBe('index.html');
    });

    test('DOMContentLoaded handler populates remembered username', () => {
        buildDOM();
        localStorage.setItem('rememberedUsername', 'rememberedUser');

        loadLoginScript();

        // trigger the DOMContentLoaded listener registered by the script
        window.dispatchEvent(new Event('DOMContentLoaded'));

        expect(document.getElementById('username').value).toBe('rememberedUser');
        expect(document.getElementById('rememberMe').checked).toBe(true);
    });
});
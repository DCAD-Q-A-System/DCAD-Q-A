import { logout } from "./logout";


test('Removing loginData', () => {
    logout();
    expect(localStorage.getItem("loginData")).toBe(null);
  });
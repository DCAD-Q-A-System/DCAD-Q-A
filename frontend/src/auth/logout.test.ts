import { logout } from "./logout";


test('Removing loginData', () => {
    
    expect(localStorage.getItem("loginData")).toBe(null);
  });
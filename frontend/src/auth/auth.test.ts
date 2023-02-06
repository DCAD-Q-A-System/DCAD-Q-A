import { auth } from "./auth";

it("authentication fail",async ()=>{
    const test:string = "DUMMY_STRING";
    await auth(test);
    expect(localStorage.getItem("loginData")).toBeTruthy();
})
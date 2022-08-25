const request = require("supertest");
const app = require("./index");
const puppeteer = require("puppeteer");

///////////////////////////////////////////unit testing////////////////////////////////////////
describe("POST /", () => {
  describe("given a todo", () => {
    test("should respond with a 302 status code", async () => {
      const response = await request(app).post("/").send({
        content: "content",
        date: Date.now(),
      });
      expect(response.statusCode).toBe(302);
    });
  });
});

describe("GET /", () => {
  describe("render page", () => {
    test("should respond with a 302 status code", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });
});

///////////////////////////////////////////end to end testing////////////////////////////////////////
test("should click around", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await page.click("input#todo");
  await page.type("input#todo", "be happy");
  await page.click("button#add");
});

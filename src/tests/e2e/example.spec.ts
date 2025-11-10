import { test, expect } from "@playwright/test";
import type { UserDTO } from "../../core/user/infrastructure/user.dto";

test.describe("Application", () => {
  test("should load the base URL and display user names", async ({ page }) => {
    await page.goto("/");
    const request = await page.waitForResponse(
      (req) =>
        req.url().includes("https://jsonplaceholder.typicode.com/users") &&
        req.status() === 200
    );

    const data: UserDTO[] = await request.json();
    const userNames = data.map((user) => user.name);

    for (const name of userNames) {
      await expect(page.getByText(name)).toBeVisible();
    }
  });
});

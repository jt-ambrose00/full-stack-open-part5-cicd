const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('login form is shown', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'login' })
    const usernameInput = page.getByText('username')
    const passwordInput = page.getByText('password')

    await expect(loginButton).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
  })

  test('fails with wrong login credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('incorrect')
      await page.getByRole('button', { name: 'login' }).click()

      // await expect(page.getByText('invalid username or password'))
      //     .toBeVisible()
      await expect(page.getByText('Matti Luukkainen logged-in'))
          .not.toBeVisible()
  })
})

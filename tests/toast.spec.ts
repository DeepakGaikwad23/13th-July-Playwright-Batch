import {test, expect} from '@playwright/test'

test ('Toast: success message', async ({page})=>
{

    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Toast / Snackbar', { exact: true }).click();

    await page.locator("#toastOkBtn").click();

    //toBeVisible /toHavetext auto-retry which matters here-
    //toast text is set a tick after the click, not instantly
    await expect(page.locator("#toastBar")).toHaveText("Booking saved successfully");

})

test ("Toast: error message",async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Toast / Snackbar',{exact:true}).click();

    await page.locator("#toastErrBtn").click();

    // same toast bar, different message and colour class —
    // assert on the text, the colour is just presentation

    await expect(page.locator('#toastBar')).toHaveText("Booking could not be cancelled");

})

test("Toast: fast toast, disappears in 1 second",async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Toast / Snackbar',{exact:true}).click();

    await page.locator('#toastFastBtn').click();

    // this toast is gone after 1 second — do NOT add any
    // waitForTimeout before the assertion or you will miss it entirely

    await expect(page.locator('#toastBar')).toHaveText("Saved",{timeout:900});

})

test("Toast: delayed toast, appears after 2s",async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Toast / Snackbar', { exact: true }).click();

    await page.locator('#toastSlowBtn').click();

    // nothing appears immediately here — give the assertion a
    // long enough timeout to cover the 2 second delay, then it
    // still has 3 seconds of visible life to be caught within

    await expect(page.locator('#toastBar')).toHaveText( "Sent for approval", { timeout: 3000 });

})
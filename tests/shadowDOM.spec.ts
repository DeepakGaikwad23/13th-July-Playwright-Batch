import {test,expect} from '@playwright/test'

test("Shadow DOM: click button inside shadow root",async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText("Shadow DOM",{exact:true}).click();

    // a normal page.locator() cannot see past the shadow boundary.
    // Playwright pierces open shadow roots automatically when the
    // locator is scoped starting from the host element
    await page.locator('#shadowHost').locator('#shadowButton').click();

    await expect(page.locator('#shadowMsg')).toHaveText("Shadow button was clicked");

    //const msg = await page.locator('#shadowMsg').textContent();

    //console.log(msg);

    //expect (msg).toBe("Shadow button was clicked");

})


test("Shadow DOM: fill input and read value back",async ({page})=>
{

    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText("Shadow DOM",{exact:true}).click();

    let field = page.locator("#shadowForm").locator("#shadowInput");

    await field.fill("Testing My input inside ShadowDOM");

    let value = await field.inputValue();
    expect(value).toBe("Testing My input inside ShadowDOM");



})

test("Shadow DOM: fill input two boundaries deep",async ({page})=>
{

    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText("Shadow DOM",{exact:true}).click();

    let insidefield = page.locator("#shadowOuter").locator("#innerHost").locator("#nestedShadowInput");
    
    await insidefield.fill("Two Deep levels");

    let iv = await insidefield.inputValue();
    console.log(iv);
    expect(iv).toBe("Two Deep levels");

})
import {test,expect} from '@playwright/test'

test("Screenshot: visible area only",async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Screenshots',{exact:true}).click();

    await page.screenshot({path:"Screenshot/visible.png",fullPage:false});

})

test("Screenshot: full scrollable page",async({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Screenshots',{exact:true}).click();

    // fullPage: true scrolls through the entire page and stitches
    // it into one image, including content below the fold
    await page.screenshot({path:"Screenshot/complete.png",fullPage:true});
})

test("Screenshot: single element only",async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Screenshots',{exact:true}).click();

    // calling screenshot() on a LOCATOR, not on page, crops the
    // image tightly to just that element

    await page.locator('#screenshotTarget').screenshot({path:"Screenshot/element.png"});

})
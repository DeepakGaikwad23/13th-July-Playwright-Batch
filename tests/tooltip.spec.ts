import {test,expect} from '@playwright/test'

test("Tooltip: hover and read CSS tooltip",async ({page})=>
{

    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Tooltip', { exact: true }).click();

    // the tip element already exists in the DOM, it is just
    // hidden by CSS until the wrapper is hovered
    await page.locator('#tipBtn').hover();

    await expect(page.locator('#tipText')).toHaveText("Your booking is refundable until 24 hours before departure"); 

    //let tiptext = await page.locator('#tipText').textContent();

    //console.log(tiptext);


    //expect(tiptext).toBe("Your booking is refundable until 24 hours before departure");

})

test("Tooltip: read native title attribute",async ({page})=>
{

    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Tooltip', {exact:true}).click();

    let tip = await page.locator('#titleTipBtn').getAttribute("title");

    console.log(tip);

    expect(tip).toBe('Fares are locked for 20 minutes once you begin checkout');

})

test("Tooltip: hover on wrapper around disabled fiel",async ({page})=>
{

    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('Tooltip',{exact:true}).click();

    // disabled elements can behave inconsistently with hover across
    // browsers, so hover the WRAPPER span instead of the input itself
    // — the CSS rule that reveals the tip is attached to the wrapper
    await page.locator('#tipWrap3').hover();

    let tooltip = await page.locator('#tipLocked').textContent();

    console.log(tooltip);

    expect(tooltip).toBe("This fare cannot be edited after confirmation");


})
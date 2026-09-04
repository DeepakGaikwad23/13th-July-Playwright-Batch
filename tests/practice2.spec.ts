import {test,expect} from '@playwright/test'

test("Zone 1 - getBy Locaters",async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/shopkart-practice.html");

    //By alt text
    const profilePhoto = page.getByAltText("Profile Photo");
    console.log('01 count:',await profilePhoto.count());
    await expect(profilePhoto).toHaveCount(1);

    //02 By Placeholder
    const fullName = page.getByPlaceholder("Enter your full name");
    console.log('02 count:',await fullName.count());
    await expect(fullName).toHaveCount(1);

    //03 By Label
    const email = page.getByLabel("Email address");
    console.log('03 count:',await email.count());
    await expect (email).toHaveCount(1);

    //By the Title
    const privacy = page.getByTitle("Read our privacy policy");
    console.log('04 count:',await privacy.count());
    await expect (privacy).toHaveCount(1);

    //By Text
    const details =page.getByText("Your details are never shared with sellers",{exact:true});
    console.log('05 count:', await details.count());
    await expect(details).toHaveCount(1);

    //By test id
    const passwordstrength = page.getByTestId('password-strength');
    console.log('06 count:',await passwordstrength.count());
    await expect(passwordstrength).toHaveCount(1);

    //By role
    const createaccount = page.getByRole('button',{name:'Create account'});
    console.log('07 count:', await createaccount.count());
    await expect(createaccount).toHaveCount(1);
})

test("Zone 2 - Three failing getBy locators",async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/shopkart-practice.html");

    //const addtocart =page.getByRole('button', {name:'Add to Cart'});
    //await addtocart.click();

    const freedelivery =page.getByText('Free Delivery',{exact:true});
    await freedelivery.click();

    // const wislist = page.getByRole('button',{name:'Wishlist'});
    // await wislist.click();
})

test("Zone 3 - XPath locators",async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/shopkart-practice.html");

    //11
    const pincode = page.locator('//input[@id="pincode"]');
    await expect(pincode).toHaveCount(1);

    //12
    const street = page.locator('//input[@name="street"]');
    await expect(street).toHaveCount(1);

    //13
    const city = page.locator('//input[@name="city"][@placeholder="City"]');
    await expect(city).toHaveCount(1);

    //14
    const home = page.locator('//span[text()="Home"]');
    await expect(home).toHaveCount(1);

    //15
    const sameday = page.locator('//div[normalize-space()="Same Day"]');
    await expect(sameday).toHaveCount(1);

    //16
    const coupon =page.locator("//input[contains(@id,'coupon_') and contains(@id,'_input')]");
    await expect(coupon).toHaveCount(1);

    //17
    const promo =page.locator("//input[starts-with(@id,'promo_')]");
    await expect(promo).toHaveCount(1);

    //18
    const infoicon = page.locator("//span[@class='info-icon']/span");
    await expect(infoicon).toHaveCount(1);

    //19
    const laptopPrice = page.locator("//td[normalize-space()='Laptop']/following-sibling::td[1]");
    await expect(laptopPrice).toHaveCount(1);
    //console.log('Element 19:',await laptopPrice.innerText());
    const text = await laptopPrice.textContent();
    console.log(text?.replace("19", "").replace(/"/g, "").trim());

    //20
    const mobileproduct =page.locator("//td[normalize-space()='25000']/preceding-sibling::td[1]");
    await expect(mobileproduct).toHaveCount(1);
    //console.log('Element 20:',await mobileproduct.innerText());
    const text2 = await mobileproduct.textContent();
    console.log(text2?.replace("20", "").replace(/"/g, "").trim());

    //21
    const secondremove=page.locator("(//button[normalize-space()='Remove'])[2]");
    await expect(secondremove).toHaveCount(1);

})
import {test ,expect} from '@playwright/test'

test("file download: trigger and capture",async ({page})=>
{

    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('File Download', { exact: true }).click();

    // Open download page
    const downloadTabPromise = page.waitForEvent('popup');

    await page.locator("//button[normalize-space()='Go to Download Page']").click();

    const downloadTab = await downloadTabPromise;

    console.log("Popup opened:", downloadTab.url());

    await downloadTab.waitForLoadState('domcontentloaded');

    console.log("Popup closed?", downloadTab.isClosed());

    // IMPORTANT:
    // Start waiting for download BEFORE clicking the download link
    const [download] = await Promise.all([
        downloadTab.waitForEvent('download'),
        downloadTab.locator('//a[normalize-space()="sample.txt"]').click()
    ]);

    console.log("Downloaded file:", download.suggestedFilename());

    await download.saveAs('FileDownload/' + download.suggestedFilename());

})

test("New file download: trigger and capture",async ({page,context})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('File Download', { exact: true }).click();

    // this link opens in a new tab — wait for that tab first
    await page.locator('a[href="https://the-internet.herokuapp.com/download"]').click();
    await page.waitForEvent('popup');
    let downloadTab = context.pages()[1];
    await downloadTab.waitForLoadState();

    // register the download listener WITHOUT await, then click the
    // file link, then await the promise
    let downloadPromise = downloadTab.waitForEvent('download');
    await downloadTab.locator('//a[normalize-space()="input_file_3.txt"]').click();

    let download = await downloadPromise;
    console.log(download.suggestedFilename());

    await download.saveAs('FileDownload/' + download.suggestedFilename());

})

test("File download: validate with download.failure()",async ({page,context})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText("File Download",{exact:true}).click();

    // this link opens in a new tab — wait for that tab first
    await page.locator('a[href="https://the-internet.herokuapp.com/download"]').click();
    await page.waitForEvent('popup');
    let downloadTab = context.pages()[1];
    await downloadTab.waitForLoadState();

    // register the download listener WITHOUT await, then click the
    // file link, then await the promise
    let downloadPromise = downloadTab.waitForEvent('download')
    await downloadTab.locator("//a[normalize-space()='test.txt']").click();

    let download = await downloadPromise;

    // failure() returns null on success, an error string on failure
    expect(await download.failure()).toBeNull();

    console.log(download.suggestedFilename());

    await download.saveAs('FileDownload/' +download.suggestedFilename());

})
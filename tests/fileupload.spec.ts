import {test,expect} from '@playwright/test'

test("File upload: single file", async ({page})=>
{
    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('File Upload', { exact: true }).click();

    // never use fill() or click() on a file input —
    // setInputFiles() is the only method that works

    const fileInput = page.locator("#singleFile");

    await fileInput.setInputFiles("FileUpload/Cancelled_Cheque.jpg");

    await expect(fileInput).toHaveValue(/Cancelled_Cheque\.jpg/);


})

test ("File upload: multiple files",async ({page})=>
{

    await page.goto("file:///C:/Users/Dell/Downloads/practicekart-v6_1.html");

    await page.getByText('File Upload', { exact: true }).click();

    // pass an array of paths instead of a single string —
    // each path in the array is attached as a separate file

    const fileInput = page.locator('#multiFile');

    await fileInput.setInputFiles(["FileUpload/Cancelled_Cheque.jpg",'FileUpload/GRATUITY FORM Updated.jpg']);

    const fileNames = await fileInput.evaluate((input: HTMLInputElement) =>Array.from(input.files ?? []).map(file => file.name));

    expect(fileNames).toContain("Cancelled_Cheque.jpg");
    expect(fileNames).toContain("GRATUITY FORM Updated.jpg");
})
# Chrome Extension: NU Works Job Scraper

## Project Overview

This project is a **Chrome extension** designed to scrape job information from the NU Works website. Once installed, it provides a simple popup window with a button. When the button is clicked, the content script scrapes the current webpage on NU Works and extracts job-related information such as:

- **Job Title**
- **Job Description**
- **Job Location**
- **Date Posted**
- **Other Relevant Information**

The scraped data can then be used for analysis, export, or other use cases.

## Features

- **Simple UI**: A button in the popup window triggers the scraping process.
- **Automatic Scraping**: Scrapes job-related information from the NU Works webpage you are viewing.
- **Useful Data**: Extracts key information like the job title, description, location, and posting date.

## Installation

### Prerequisites
- **Google Chrome**: Ensure you have the Chrome browser installed.
- **Developer Mode**: You need to enable developer mode in Chrome to load this extension.

### Steps to Add the Chrome Extension

1. **Download or Clone the Repository**
   - Clone this repository to your local machine using:
     ```bash
     git clone https://github.com/your-repository-url.git
     ```

2. **Enable Developer Mode in Chrome**
   - Open your Chrome browser.
   - Go to `chrome://extensions/`.
   - In the top right corner, enable **Developer mode** by toggling the switch.

3. **Load the Extension**
   - Click on the "Load unpacked" button on the `chrome://extensions/` page.
   - Select the directory where you cloned/downloaded this repository. Make sure the manifest file (`manifest.json`) is in the root of the directory.
   - The extension should now appear in the list of installed extensions.

4. **Pin the Extension (Optional)**
   - Click on the puzzle piece icon (Extensions icon) in the Chrome toolbar.
   - Find the NU Works Job Scraper extension and click the pin icon to pin it to the toolbar for easy access.

## Usage

1. **Open NU Works**: Navigate to a job listing on the NU Works website.
2. **Click the Extension Icon**: In the Chrome toolbar, click the NU Works Job Scraper extension icon.
3. **Click the Scrape Button**: In the popup window, click the "Scrape Job Info" button.
4. **View Extracted Information**: The extension will scrape the job title, description, location, posting date, and other relevant information from the webpage.

## Project Structure

```
- manifest.json       // Chrome extension manifest
- popup.html          // HTML for the popup window
- popup.ts            // JavaScript handling the popup window interactions
- content.ts          // Content script responsible for scraping job information
- styles.css          // Styling for the popup window
```

## Future Features (Planned)

- **Export Functionality**: Allow users to export the scraped job data as a CSV or JSON file.
- **Customizable Fields**: Enable users to choose which job fields to scrape.
- **Scraping Multiple Jobs**: Add support to scrape job listings from a page with multiple listings.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any ideas for improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

Feel free to modify this README to better suit your project and its structure!
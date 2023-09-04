const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");
const { resolve } = require("path");

// Define the URLs to include in the sitemap
const urls = [
  { url: "/", changefreq: "weekly", priority: 1 },
  { url: "/#/categories", changefreq: "weekly", priority: 0.8 },
  { url: "/#/products", changefreq: "weekly", priority: 0.8 },
  { url: "/#/user", changefreq: "weekly", priority: 0.8 },
  { url: "/#/brands", changefreq: "weekly", priority: 0.8 },
  { url: "/#/services", changefreq: "weekly", priority: 0.8 },
  { url: "/#/previous-clients", changefreq: "weekly", priority: 0.8 },
  // Add more URLs as needed
];

// Create a sitemap instance
async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: "https://vm-racunala.store" }); // Replace with your website's domain

  // Add the routes to the sitemap
  urls.forEach((route) => {
    sitemap.write(route);
  });

  sitemap.end();

  // Convert the sitemap stream to a string
  const sitemapXML = await streamToPromise(sitemap);

  // Save the sitemap to a file (public/sitemap.xml)
  const sitemapPath = resolve(__dirname, "public", "sitemap.xml");
  const writeStream = fs.createWriteStream(sitemapPath);
  writeStream.write(sitemapXML);
  writeStream.end();

  console.log(`Sitemap generated at ${sitemapPath}`);
}

generateSitemap();
// Generate the sitemap XML

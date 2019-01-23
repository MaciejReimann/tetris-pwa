self.addEventListener("install", e => {
  // create a cache and add assets to it
  console.log(e);
});

self.addEventListener("activate", e => {
  console.log(e);
});

self.addEventListener("message", e => {
  console.log(e);
});

import '@babel/polyfill'

document.body.innerHTML = '<h1>Hello Webpack!</h1>';
console.log('hello webpack');

fetch('/api/users/hankaibo')
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    document.body.innerHTML = `<img src="${myJson.avatar_url}" />`
  });

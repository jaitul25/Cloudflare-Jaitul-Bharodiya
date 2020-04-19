addEventListener('fetch', event => {
  event.respondWith(request(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */ 
async function request(request){
let res = await fetch("https://cfw-takehome.developers.workers.dev/api/variants")
let data = await res.json()
let variants = data["variants"]
let probab = Math.random() < 0.5 ? 0 : 1

let web1 = await fetch(variants[0])
let web2 = await fetch(variants[1])

// Rewriter 

const rewriter = new HTMLRewriter()
  .on('title', new ElementHandler('Jaitul Bharodiya Cloudflare'))
  .on('h1#title', new ElementHandler('Wu Wei'))
  .on('p#description', new ElementHandler('Do you think Duality or Non-Duality takes you to Nirvana'))

const rewriter2 = new HTMLRewriter()
  .on('title', new ElementHandler('Jaitul Bharodiya Cloudflare'))
  .on('h1#title', new ElementHandler('Tat Tvam Asi'))
  .on('p#description', new ElementHandler("It is between them that resides "))
  .on('bgsrc', new ElementHandler)

if (probab == 0)
return rewriter.transform(web1)
else 
return rewriter2.transform(web2)
}


class ElementHandler {
  constructor(content) {
    this.content = content;
  }

// An incoming element, such as `div`
 
element(element){
  element.setInnerContent(this.content);
}
  }


async function handleRequest(req) {
  const res = await fetch(req)

  return new HTMLRewriter().on('div', new ElementHandler()).transform(res)
}
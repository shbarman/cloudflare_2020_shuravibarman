addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event));
});
const links = [
    {
        "name": "Portfolio",
        "url": "https://shbarman.github.io/"
    },
    {
        "name": "LinkedIn Profile",
        "url": "https://www.linkedin.com/in/shuravibarman/"
    },
    {
        "name": "Github Profile",
        "url": "https://github.com/shbarman"
    }
]

class Avatar {
    async element(element) {
        element.setAttribute("src", "https://i.ibb.co/ZKjtPzd/image.png");
    }
}
class Background {
    async element(element) {
        element.setAttribute("class", "bg-indigo-300");
    }
}
class ProfileTransformer {
    async element(element) {
        element.removeAttribute('style');
        element.get
    }
}
class SocialTransformer {
    async element(element) {
        element.removeAttribute('style');
        element.append("<a href=\"https://linkedin.com/in/shuravibarman/\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/61/61109.svg\"></a>", { html: true })
        element.append("<a href=\"https://github.com/shbarman/\"><img src=\"https://www.flaticon.com/svg/static/icons/svg/37/37318.svg\"></a>", { html: true })
      }
}

class TitleTransformer {
    async element(element) {
        element.setInnerContent("Shuravi Barman");
    }
}
class Username {
    async element(element) {
        element.setInnerContent("Shuravi Barman");
    }
}
class LinksTransformer {
    constructor(links) {
      this.links = links
    }
  
    async element(element) {
      links.forEach(link => {
        element.append(
          `<a href="${link.url}">${link.name}</a>`, 
          { html: true }
        );
      })
    }
  }


async function handleRequest(event) {
    const url = new URL(event.request.url);
    let element = url.pathname.split("/").filter(n => n);
  
    if (element[0] === "links") {
      const json = JSON.stringify(links, null, 2);
      return new Response(json, {
        headers: {
          "content-type": "application/json;charset=UTF-8"
        }
      })
  
    } else if (element[0] === undefined){
      const headers = {
        headers: {
          "content-type": "text/html;charset=UTF-8"
        },
      }
      const response = await fetch("https://static-links-page.signalnerve.workers.dev/", headers)
  
      return new HTMLRewriter()
        .on("div#links", new LinksTransformer())
        .on("div#profile", new ProfileTransformer())
        .on("img#avatar", new Avatar())
        .on("h1#name", new Username())
        .on("div#social", new SocialTransformer())
        .on("title", new TitleTransformer())
        .on("body", new Background())
        .transform(response);
    }  else {
        return new Response("404 - Page Not Found", { status: "404" });
    }
  }
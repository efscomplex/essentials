type Endpoint = `/${string}`

interface HttpRequest {
   getJson: (endpoint: Endpoint, init?: RequestInit) => Promise<unknown>
}

export class Http implements HttpRequest {
   private headers: HeadersInit = {}
   constructor(public baseUrl: string) {}

   getJson(endpoint: Endpoint, init?: RequestInit) {
      const opts = {
         method: 'GET',
         ...init
      }
      return this.resource(endpoint, opts).then((resp) => resp.json())
   }
   private resource(endpoint: Endpoint, init?: RequestInit) {
      const opts = {
         ...init,
         headers: this.headers
      }

      return fetch(this.baseUrl + endpoint, opts)
   }
   setHeaders(headers: Headers) {
      this.headers = headers
      return this
   }
}

CRUD API – Webshop
Detta projekt är ett REST API byggt med Node.js, Express och MongoDB.  
Syftet med projektet är att skapa en backend för en enkel webshop som kan hantera produkter och ordrar.
API:t stödjer full CRUD-funktionalitet samt sökning, sortering och pagination på serversidan.  
En enkel frontend har också skapats för att kunna testa API:t och visa produkter.

Tekniker
Projektet är byggt med följande tekniker:
- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript
- HTML och JavaScript

Projektstruktur
Projektet är organiserat i flera delar för att göra koden mer strukturerad och lätt att underhålla.

- models – definierar databasscheman för produkter och ordrar  
- routes – innehåller API-endpoints  
- middleware – används för validering och loggning  
- server.ts – startar servern och ansluter till databasen  

Produkter
Varje produkt innehåller:
- id
- name
- price
- stock
- createdAt

API-endpoints för produkter:

GET /api/products  
GET /api/products/:id  
POST /api/products  
PUT /api/products/:id  
DELETE /api/products/:id  

 Ordrar
En order innehåller kundinformation samt en lista med produkter.
En order innehåller:
- customerName
- customerEmail
- items
- totalPrice
- createdAt

API-endpoints för ordrar:

POST /api/orders  
GET /api/orders  

När en order skapas beräknas totalPrice automatiskt baserat på produktens pris och antal.

Sökning och sortering
API:t stödjer sökning och sortering direkt på serversidan.

Exempel:

GET /api/products?search=iphone  
GET /api/products?sort=price  
GET /api/orders?search=anna  
GET /api/orders?sort=totalPrice  

Pagination
Pagination används för att begränsa hur mycket data som returneras.

Exempel:

GET /api/products?limit=10&skip=0

Frontend
En mycket enkel frontend har skapats med HTML och JavaScript.  
Den används för att hämta produkter från API:t och visa dem i en lista.

Frontend kommunicerar med backend via fetch API.

Starta projektet
Installera dependencies:

npm install

Starta servern:

npx ts-node src/server.ts

Servern körs på:

http://localhost:4000

Sammanfattning
I detta projekt har ett komplett CRUD API för en webshop utvecklats.  
API:t innehåller produkt- och orderhantering, server-side sökning och sortering samt ett enkelt frontend-gränssnitt för att testa funktionaliteten.

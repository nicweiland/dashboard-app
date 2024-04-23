# DashboardApp

This project is an Angular-based application that visualizes real-time data received from a WebSocket server. The data is represented in two ways: as a bar chart and as a list of data items with pagination. The project includes several key components and services.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

## Installation

Run `npm install`

## Development server

Run on websocket-server folder `node server.js` and `node votes-server.js`
Run `ng serve` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Components

### DataVisualizationComponent

This component displays a bar chart using Chart.js. It initializes the chart and updates it with incoming data from the WebSocket server.

- *Template*: Contains a <canvas> element to render the chart.
- *Logic*: Uses the @ViewChild decorator to get a reference to the canvas element. Upon initialization, it creates a bar chart with default data. It can update the chart as new data arrives.

### DetailedReportsComponent

This component displays the real-time data as a list of items with pagination controls. It uses a WebSocket service to receive data and updates the displayed list as new items arrive.

- *Template*: Displays the list of data items and provides pagination controls (Previous and Next buttons).
- *Logic*: Contains the data array that gets updated as new messages are received from the WebSocket service. It includes pagination logic with currentPage, itemsPerPage, and totalPages. The pagination is designed to handle 20 items per page.

## Services

### WebSocketService and WebSocketServiceVotes

This service establishes a WebSocket connection to a specified URL and provides methods to receive and send messages.

- *Constructor*: Initializes a WebSocket connection to the server.
- *Methods*:
  - getMessages(): Returns an Observable that emits incoming messages from the WebSocket server.
  - sendMessage(msg): Sends a message to the server.
  - close(): Closes the WebSocket connection.

## Styles and Responsiveness

### CSS

The application has custom CSS styles for a clean and responsive design. It includes styles for the list of data items, pagination controls, and responsive adjustments for smaller screens.

- *Styles*:
  - .real-time-data-container: Styles for the container, with padding, background color, border-radius, and box-shadow.
  - .real-time-data-list: List styles with no bullets, padding, or margin.
  - .data-item: Flex layout with padding and border-bottom for separation.
  - .pagination-controls: Styles for the pagination buttons, including hover and disabled states.

- *Responsiveness*:
  - On smaller screens (max-width: 768px), the data items change to a vertical alignment with adjusted padding.

## WebSocket Server

The WebSocket server sends real-time data to the client. It is implemented using Node.js and the ws library.

- *Initialization*: Creates a WebSocket server on port 8080 and 8081.
- *Client Connection*: Listens for new connections and sends real-time data every second.
- *Client Disconnection*: Handles client disconnections.

## Running unit tests

Run `ng test` or `npm run tests` to execute the unit tests via [Karma](https://karma-runner.github.io).

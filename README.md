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

## Challenges

Here are some challenges I've faced during the development of a project like this one, along with solutions or approaches to address them:

### 1. WebSocket Integration
Integrating WebSockets into an Angular application can be complex due to asynchronous communication and data flow between server and client. Key challenges include:

- *Connection Management*: Ensuring a stable connection and handling disconnections or errors.
- *Data Format*: Ensuring consistent data formatting between server and client.

*Solution*:
Implement a dedicated WebSocket service to manage the connection and handle data reception, providing a stable communication layer for other components.

### 2. Real-Time Data Visualization
Visualizing real-time data can lead to performance issues, especially with frequent updates. Maintaining a smooth user experience can be challenging.

- *Performance*: Frequent updates to the chart or UI can cause lag or stuttering.
- *Data Consistency*: Ensuring that data displayed in the chart and list remains consistent as new data arrives.

*Solution*:
Use optimized libraries like Chart.js for data visualization and implement strategies to limit unnecessary re-renders. Consider debouncing or batching data updates to improve performance.

### 3. Pagination and Data Management
When dealing with large volumes of data, implementing pagination and keeping track of the data can be challenging.

- *Pagination Logic*: Keeping track of the current page, total pages, and items per page while updating them as new data arrives.
- *Data Synchronization*: Ensuring the data remains synchronized across components.

*Solution*:
Implement a flexible pagination system with methods to navigate pages and update total pages as the data grows. Use state management techniques to keep data consistent across components.

### 4. Responsive Design
Creating a responsive user interface that works well on various devices can be challenging, especially with complex layouts.

- *Responsive Behavior*: Ensuring the UI adapts to different screen sizes without breaking.
- *Flexibility*: Maintaining a flexible design that accommodates future changes or additional features.

*Solution*:
Use CSS media queries to adjust layout and styling based on screen size. Implement a mobile-first design approach to ensure a seamless experience on smaller devices.

### 5. Integration with Other Components
Integrating multiple components and services in an Angular project can lead to challenges in communication and data flow.

- *Component Communication*: Ensuring components can communicate effectively, especially when data is updated in real-time.
- *Service Dependency*: Managing dependencies between components and services.

*Solution*:
Leverage Angular's dependency injection for service management and use observables for component communication. Keep components decoupled to ensure scalability and ease of maintenance.

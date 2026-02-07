COLLEGE BUS MANAGEMENT SYSTEM | FRONTEND ARCHITECTURE
1. CORE PHILOSOPHY: ACTION-ORIENTED DESIGN
This project intentionally avoids the "Dashboard Trap." Instead of empty graphs and vanity metrics, 
the interface is built as a high-efficiency productivity tool.
 Every page is designed for a specific operational task—registering, assigning, or transitioning—ensuring that the user gets in, performs the task, and gets out. 
 There are no "filler" pages; if it doesn't help manage a bus or a student, it isn't here.
 2. THE AXIOS ENGINE (CENTRALIZED API)
We utilize a singleton Axios instance located in src/api/axios.js to manage all network traffic. This is the "heart" of the frontend.

Key Benefits:

Global BaseURL: One single point of configuration for the backend port (e.g., 8800).

Automatic Auth: withCredentials: true is enabled by default, ensuring session cookies or tokens are passed automatically.

Service Decoupling: Components do not handle URLs or headers. They call clean service functions like tripdata(), 
which keeps the UI code focused on the user.
3. ADVANCED PAGINATION: THE "RELAY RACE" SYSTEM
To handle thousands of trip records without slowing down the browser, we implemented Cursor-Based Pagination rather than traditional page numbering.

How it works: Each API response provides a nextCursor (the ID of the last record found).

The Hand-off: When the "Next" button is clicked, the frontend hands that ID back to the backend. The database knows exactly where to start searching, making the query instant.

Memory Management: We maintain a cursors array in the React state. This allows the user to go "Previous" and "Next" by navigating through stored ID strings.

Edge Case Handling: If the backend returns a null cursor, the UI immediately blocks further requests and notifies the user that the maximum limit has been reached.
4. FUNCTIONAL MODULES
Fleet Management
Bus Register: Standardized onboarding for new vehicles.

Bus Assign: The bridge between assets and operations, mapping buses to routes and slots.

Bus Student Details: A dedicated manifest lookup to see which students are assigned to which route or vehicle.

Trip & Transition Logic
Trip Creation: Simple, dual-field logic for scheduling.

Trip Transitions: Managing the lifecycle of a trip as it moves through different operational states.

Trip Logs: A filtered view (Route/Date/Slot) of all historical data powered by the cursor engine.

Trip Cancel: A critical safety route to terminate or delete scheduled instances.
6. GETTING STARTED
Environment: Point the Axios instance to your backend environment.

Installation: Run npm install to grab Tailwind, Lucide-React, and Axios.

Execution: Use npm start for the development environment.
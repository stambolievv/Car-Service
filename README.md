# 🔧 Car-Service 🔧

<details>
  <summary><b>Table of Contents</b></summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
      <ul>
        <li><a href="#cars-management">Cars Management</a></li>
        <li><a href="#repairs-management">Repairs Management</a></li>
      </ul>
    </li>
    <li>
      <a href="#user-specific-access">User-specific Access</a>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#search-functionality">Search Functionality</a></li>
        <li><a href="#pagination">Pagination</a></li>
        <li><a href="#cache-implementation">Cache Implementation</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#clone-project">Clone Project</a></li>
        <li><a href="#installing">Installing</a></li>
      </ul>
    </li>
    <li>
      <a href="#deployment">Deployment</a>
    </li>
    <li>
      <a href="#license">License</a>
    </li>
  </ol>
</details>

## Test Credentials
To facilitate testing, you can use the following credentials:
- **Username:** admin
- **Password:** admin

**Note:** Please refrain from creating, editing, or deleting any information using these test credentials to maintain the integrity of the test environment.

## Overview
The Car-Service project is a robust web application designed for managing cars and their repairs. Users can log in or create an account, granting them exclusive access to their own set of cars and associated repairs.

![THUMBNAIL]

### Cars Management
- **Adding Cars:**
  - VIN Number
  - Registration Plate Number
  - Make and/or Model
  - Engine Type
  - Customer Name

- **Operations on Cars:**
  - Create: Add new car with specified details.
  - Edit: Modify existing car information.
  - Delete: Remove a car from the system with all repairs associated with it.

### Repairs Management
- **Viewing Repairs:**
  - Clicking on the repair button for a specific car opens a dedicated page displaying all repairs associated with that particular car.

- **Operations on Repairs:**
  - Create: Add new repairs, specifying details.
  - Details: Access a detailed page for each repair.
  - Edit: Modify existing repair information.
  - Delete: Remove repairs from the system.

## User-specific Access
- Each user can only view and manage their own set of cars and repairs, ensuring data privacy.

## Features
### Search Functionality
  - The Cars page features a search block allowing users to search for cars based on:

### Pagination
- Dedicated pagination is implemented on both the Cars page and the Repairs page, providing users with easy navigation through large datasets.

### Cache Implementation
- To enhance data fetching speed and ensure robust performance, the project incorporates a cache mechanism. This implementation optimizes data retrieval, providing a seamless and efficient user experience.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development. See deployment for notes on how to deploy the project on a live system.

### Clone Project
```bash
git clone git@github.com:stambolievv/Car-Service.git
```

### Installing
Run `npm install` from the terminal

## Deployment
Open the terminal and run the desired command

| Type           | Terminal Command  | Description                                            |
| :------------- | :---------------- | :----------------------------------------------------- |
| dev            | `npm run dev`     | Run development server for live editing                |
| prod           | `npm run build`   | Build the project for production deployment            |
| prod + preview | `npm run preview` | Preview the production build locally before deployment |

## License
This project is licensed under the Apache-2.0 License - see the [LICENSE] file for details

[LICENSE]:LICENSE
[THUMBNAIL]:/assets/images/thumbnail.png
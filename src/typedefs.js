/**
 * This file contains all the custom type definitions used in the application.
 * @module typedefs
 */

//*--------------Utility Types--------------
/**
 * @typedef {{[K in keyof T]: T[K]} & {}} Prettify
 * @template T
 */

//*--------------PageJS--------------
/**
 * @typedef {Prettify<{[K in keyof import('page').Context]:
 * K extends "state" ? Record<string, unknown> & {path: string, lastVisitedRoute?: string} :
 * K extends "params" ? Record<string, string> :
 * import('page').Context[K]
 * } & {
 * init?: boolean,
 * page: import('page').Static
 * }>} TypedPageJSContext Represents the original PageJS context object with better types.
 */
/**
 * @typedef {Prettify<{
 * render: (content: unknown, options?: RenderOptions) => import('lit').RootPart
 * root: HTMLElement,
 * } & TypedPageJSContext>} Context Represents a PageJS context object.
 */
/**
 * @typedef {{container?: HTMLElement | DocumentFragment | keyof HTMLElementTagNameMap } & import('lit').RenderOptions} RenderOptions Represents an object with render options.
 */

//*--------------User Related--------------
/**
 * @typedef {object} UserStoredData Represents an object with user's data.
 * @property {string} username - The username of the user.
 * @property {string} id - The id of the user.
 * @property {string} token - The token of the user.
 */
/**
 * @typedef {object} UserAuthData Represents an object with user's data.
 * @property {string} objectId - The unique identifier of the object.
 * @property {string} username - The username associated with the object.
 * @property {string} sessionToken - The session token associated with the object.
 * @property {string} createdAt - The server creation timestamp of the object (ISO 8601 format).
 * @property {string} updatedAt - The server last update timestamp of the object (ISO 8601 format).
 */
/**
 * @typedef {object} UserLoginCredentials Represents an object with user's login credentials.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */
/**
 * @typedef {object} UserRegisterCredentials Represents an object with user's register credentials.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 * @property {string} repass - The confirm password of the user.
 */

//*--------------Car Related--------------
/**
 * @typedef {object} CarData Represents an object with car's data.
 * @property {string} vin - The vehicle identification number (VIN) of the car.
 * @property {string} registration - The registration number of the car.
 * @property {string} make - The make or model of the car.
 * @property {string} engine - The engine details of the car.
 * @property {string} customerName - The name of the customer associated with the car.
 */
/**
 * @typedef {object} Car Represents a car object with specific properties.
 * @property {string} objectId - The unique identifier of the car.
 * @property {string} vin - The vehicle identification number (VIN) of the car.
 * @property {string} registration - The registration number of the car.
 * @property {string} make - The make or model of the car.
 * @property {string} engine - The engine details of the car.
 * @property {string} customerName - The name of the customer associated with the car.
 * @property {object} owner - The owner object pointer of the car.
 * @property {string} owner.objectId - The unique identifier of the owner.
 * @property {'_User'} owner.className - The class name of the owner.
 * @property {'Pointer'} owner.__type - The type of the owner object pointer.
 * @property {string} createdAt - The server creation timestamp of the car object (ISO 8601 format).
 * @property {string} [updatedAt] - The server last update timestamp of the car object (ISO 8601 format).
 */

//*--------------Repair Related--------------
/**
 * @typedef {object} RepairData Represents an object with repair's data.
 * @property {string} km - The kilometer value associated with the repair.
 * @property {string} date - The date associated with the repair.
 * @property {string} description - The description of the repair.
 * @property {string} profit - The profit associated with the repair.
 */
/**
 * @typedef {object} Repair Represents a repair object with specific properties.
 * @property {string} objectId - The unique identifier of the repair.
 * @property {string} km - The kilometer value associated with the repair.
 * @property {string} date - The date associated with the repair.
 * @property {string} description - The description of the repair.
 * @property {string} profit - The profit associated with the repair.
 * @property {object} owner - The owner object pointer of the repair.
 * @property {string} owner.objectId - The unique identifier of the owner.
 * @property {'_User'} owner.className - The class name of the owner.
 * @property {'Pointer'} owner.__type - The type of the owner object pointer.
 * @property {object} car - The car object pointer associated with the repair.
 * @property {string} car.objectId - The unique identifier of the car.
 * @property {'Car'} car.className - The class name of the car.
 * @property {'Pointer'} car.__type - The type of the car object pointer.
 * @property {string} createdAt - The server creation timestamp of the repair object (ISO 8601 format).
 * @property {string} [updatedAt] - The server last update timestamp of the repair object (ISO 8601 format).
 */

//*--------------CRUD Related--------------
/**
 * @typedef {{ method: Uppercase<string>, headers: Headers, body?: string }} RequestOptions Represents an object containing the request options with the specified method, headers, and body (if data provided).
 */
/**
 * @typedef {object} PostRequestResult Represents the results of a POST request.
 * @property {string} objectId - The unique identifier of the item.
 * @property {string} createdAt - The server creation timestamp of the object (ISO 8601 format).
 */
/**
 * @typedef {object} PutRequestResult Represents the results of a PUT request.
 * @property {string} updatedAt - The server last update timestamp of the object (ISO 8601 format).
 */
/**
 * @typedef {{}} DeleteRequestResult Represents the results of a DELETE request.
 */
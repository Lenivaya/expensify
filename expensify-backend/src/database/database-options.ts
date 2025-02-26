/**
 * Configuration options for database connection.
 *
 * @description
 * This interface defines the required configuration parameters
 * for establishing a connection to the PostgreSQL database.
 * All fields are required to ensure proper database connectivity.
 *
 * @example
 * {
 *   host: 'localhost',
 *   port: 5432,
 *   user: 'postgres',
 *   password: 'secret',
 *   database: 'expensify'
 * }
 */
export interface DatabaseOptions {
  /**
   * The hostname where the PostgreSQL server is running
   * @type {string}
   * @example 'localhost' or '127.0.0.1'
   */
  host: string

  /**
   * The port number on which PostgreSQL is listening
   * @type {number}
   * @example 5432
   */
  port: number

  /**
   * The username to authenticate with the database
   * @type {string}
   * @example 'postgres'
   */
  user: string

  /**
   * The password for database authentication
   * @type {string}
   * @example 'secret'
   * @security This should be stored securely and never exposed
   */
  password: string

  /**
   * The name of the database to connect to
   * @type {string}
   * @example 'expensify'
   */
  database: string
}

import { compare, genSalt, hash } from 'bcrypt'

import { HashingService } from './hashing.service'

/**
 * Implementation of HashingService using the bcrypt hashing algorithm.
 *
 * @description
 * This service provides a concrete implementation of the HashingService using bcrypt,
 * a password-hashing function designed by Niels Provos and David Mazières.
 *
 * Features:
 * - Automatically generates and handles salts for each hash
 * - Uses bcrypt's adaptive hashing algorithm
 * - Implements industry-standard password hashing practices
 */
export class BcryptService implements HashingService {
  /**
   * Hashes data using bcrypt with an automatically generated salt.
   *
   * @param data - The plain text data or buffer to hash
   * @returns Promise resolving to the bcrypt hashed string
   */
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt()
    return hash(data, salt)
  }

  /**
   * Compares plain text data with a bcrypt hash.
   *
   * @param data - The plain text data or buffer to compare
   * @param encrypted - The bcrypt hashed string to compare against
   * @returns Promise resolving to true if the data matches the hash, false otherwise
   */
  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return await compare(data, encrypted)
  }
}

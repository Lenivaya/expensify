import { Injectable } from '@nestjs/common'

/**
 * Abstract service defining the contract for password hashing operations.
 *
 * @description
 * This abstract class defines the interface for password hashing operations.
 * Implementations of this service should provide secure methods for:
 * - Hashing passwords or sensitive data
 * - Comparing plain text data with hashed data
 *
 * The actual hashing algorithm and implementation details are left to the concrete implementations
 * to allow for flexibility in choosing the most appropriate hashing strategy.
 */
@Injectable()
export abstract class HashingService {
  /**
   * Hashes the provided data using a secure hashing algorithm.
   *
   * @param data - The plain text data or buffer to hash
   * @returns Promise resolving to the hashed string
   */
  abstract hash(data: string | Buffer): Promise<string>

  /**
   * Compares plain text data with a hashed value.
   *
   * @param data - The plain text data or buffer to compare
   * @param encrypted - The hashed data to compare against
   * @returns Promise resolving to true if the data matches the hash, false otherwise
   */
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>
}

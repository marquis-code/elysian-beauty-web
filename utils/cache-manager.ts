interface CacheConfig {
  key: string
  expiryHours?: number
  maxSize?: number
}

interface CacheData<T> {
  data: T
  timestamp: number
}

export class CacheManager {
  private static readonly DEFAULT_EXPIRY_HOURS = 24
  private static readonly DEFAULT_MAX_SIZE = 50000 // 50KB

  /**
   * Save data to localStorage with expiry and size checks
   */
  static set<T>(config: CacheConfig, data: T): boolean {
    try {
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
      }

      const cacheString = JSON.stringify(cacheData)
      const maxSize = config.maxSize || this.DEFAULT_MAX_SIZE

      // Check cache size
      if (cacheString.length > maxSize) {
        console.warn(`Cache data for ${config.key} exceeds size limit (${maxSize} bytes)`)
        return false
      }

      localStorage.setItem(config.key, cacheString)
      return true
    } catch (error) {
      console.error(`Failed to save cache for ${config.key}:`, error)

      // Handle quota exceeded error
      if (error instanceof DOMException && error.name === "QuotaExceededError") {
        this.clearExpiredCaches()
      }

      return false
    }
  }

  /**
   * Get data from localStorage with expiry check
   */
  static get<T>(config: CacheConfig): T | null {
    try {
      const cached = localStorage.getItem(config.key)
      if (!cached) return null

      const cacheData: CacheData<T> = JSON.parse(cached)
      const expiryHours = config.expiryHours || this.DEFAULT_EXPIRY_HOURS
      const cacheAge = Date.now() - cacheData.timestamp
      const expiryTime = expiryHours * 60 * 60 * 1000

      // Check if cache is still valid
      if (cacheAge < expiryTime) {
        return cacheData.data
      } else {
        // Cache expired, remove it
        this.remove(config.key)
        return null
      }
    } catch (error) {
      console.error(`Failed to load cache for ${config.key}:`, error)
      this.remove(config.key)
      return null
    }
  }

  /**
   * Remove specific cache entry
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Failed to remove cache for ${key}:`, error)
    }
  }

  /**
   * Clear all expired caches
   */
  static clearExpiredCaches(): void {
    try {
      const keysToRemove: string[] = []

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key) continue

        try {
          const cached = localStorage.getItem(key)
          if (!cached) continue

          const cacheData = JSON.parse(cached)
          if (cacheData.timestamp) {
            const cacheAge = Date.now() - cacheData.timestamp
            const expiryTime = this.DEFAULT_EXPIRY_HOURS * 60 * 60 * 1000

            if (cacheAge >= expiryTime) {
              keysToRemove.push(key)
            }
          }
        } catch {
          // Skip invalid JSON entries
          continue
        }
      }

      keysToRemove.forEach((key) => localStorage.removeItem(key))
      console.log(`Cleared ${keysToRemove.length} expired cache entries`)
    } catch (error) {
      console.error("Failed to clear expired caches:", error)
    }
  }

  /**
   * Clear all caches matching a pattern
   */
  static clearByPattern(pattern: string): void {
    try {
      const keysToRemove: string[] = []

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.includes(pattern)) {
          keysToRemove.push(key)
        }
      }

      keysToRemove.forEach((key) => localStorage.removeItem(key))
      console.log(`Cleared ${keysToRemove.length} cache entries matching "${pattern}"`)
    } catch (error) {
      console.error(`Failed to clear caches by pattern "${pattern}":`, error)
    }
  }

  /**
   * Get total localStorage usage in bytes
   */
  static getStorageSize(): number {
    let total = 0
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
          const value = localStorage.getItem(key)
          if (value) {
            total += key.length + value.length
          }
        }
      }
    } catch (error) {
      console.error("Failed to calculate storage size:", error)
    }
    return total
  }

  /**
   * Check if storage is near quota (>80% full, assuming 5MB limit)
   */
  static isStorageNearQuota(): boolean {
    const ASSUMED_QUOTA = 5 * 1024 * 1024 // 5MB
    const currentSize = this.getStorageSize()
    return currentSize > ASSUMED_QUOTA * 0.8
  }
}

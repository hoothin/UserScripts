/**
 * Chinese character type enumeration
 */
export declare const ChineseType: {
  /** Simplified Chinese */
  readonly SIMPLIFIED: 0;
  /** Traditional Chinese */
  readonly TRADITIONAL: 1;
  /** Unknown type */
  readonly UNKNOWN: 2;
};

/**
 * Output format enumeration
 */
export declare const OutputFormat: {
  /** Normal output - only the converted result */
  readonly NORMAL: 0;
  /** Bracket format - outputs「Simplified(Traditional)」or「Traditional(Simplified)」*/
  readonly BRACKET: 1;
  /** Ruby annotation format - outputs <ruby>Simplified<rt>Traditional</rt></ruby> */
  readonly RUBY: 2;
};

/**
 * Conversion options
 */
export interface ConversionOptions {
  /**
   * Output format
   * @default OutputFormat.NORMAL
   */
  format?: 0 | 1 | 2;
}

/**
 * Cache object for storing conversion dictionaries
 */
export interface ConversionCache {
  sc2tcCombTree?: Record<string, any>;
  tc2scCombTree?: Record<string, any>;
  stDict?: Record<string, string>;
  tsDict?: Record<string, string>;
}

/**
 * Custom dictionary mapping
 * Key: source text (simplified or traditional)
 * Value: target text (can be string or array of strings for multiple mappings)
 */
export type CustomDictionary = Record<string, string | string[]>;

/**
 * Result object returned by stcasc function
 */
export interface StcascConverter {
  /**
   * Convert traditional Chinese to simplified Chinese
   * @param text - Text to convert
   * @param options - Conversion options
   * @returns Converted simplified Chinese text
   */
  simplized(text: string, options?: ConversionOptions): string;

  /**
   * Convert simplified Chinese to traditional Chinese
   * @param text - Text to convert
   * @param options - Conversion options
   * @returns Converted traditional Chinese text
   */
  traditionalized(text: string, options?: ConversionOptions): string;

  /**
   * Detect Chinese text type
   * @param text - Text to detect
   * @returns ChineseType value (0=SIMPLIFIED, 1=TRADITIONAL, 2=UNKNOWN)
   */
  detect(text: string): 0 | 1 | 2;

  /**
   * Cached conversion dictionaries
   */
  cache: ConversionCache;
}

/**
 * Initialize Chinese converter with optional cache and custom dictionary
 *
 * @param cache - Optional cache object to reuse conversion dictionaries
 * @param custom - Optional custom dictionary for special term conversions
 * @param disableTerms - If true, disables built-in term conversions
 * @returns Converter object with conversion methods
 *
 * @example
 * ```typescript
 * import stcasc from 'switch-chinese';
 *
 * const converter = stcasc();
 * const traditional = converter.traditionalized('简体中文');
 * const simplified = converter.simplized('繁體中文');
 * const type = converter.detect('繁體中文');
 * ```
 *
 * @example
 * ```typescript
 * // With custom dictionary
 * const converter = stcasc({}, {
 *   '自定义词': '自訂詞',
 *   '程序': ['程式', '程序']
 * });
 * ```
 *
 * @example
 * ```typescript
 * // With output format
 * const converter = stcasc();
 * const result = converter.traditionalized('简体', { format: 1 });
 * // Output: 簡體(简体)
 * ```
 */
declare function stcasc(
  cache?: ConversionCache,
  custom?: CustomDictionary,
  disableTerms?: boolean
): StcascConverter;

export default stcasc;
